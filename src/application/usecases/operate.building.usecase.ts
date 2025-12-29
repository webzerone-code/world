import { Injectable } from '@nestjs/common';
import { UserBuildingRepository } from '../../infrastructure/repositories/user.building.repository';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';
import { BuildingNotFoundError } from '../../domain/error/building-not-found.error';
import { UserItemRepository } from '../../infrastructure/repositories/user.item.repository';
import { BuildingOperationDto } from '../../infrastructure/persistence/responses/buildings/building.operation.dto';
import { BuildingEntity } from '../../domain/entities/building/building.entity';
import { ItemEntity } from '../../domain/entities/item/item.entity';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { UserItemEntity } from '../../domain/entities/userItems/user.item.entity';
import { BuildingState } from '../../domain/entities/building/building.state';

@Injectable()
export class OperateBuildingUseCase {
  public constructor(
    private readonly itemRepository: ItemRepository,
    private readonly userBuildingRepository: UserBuildingRepository,
    private readonly userItemRepository: UserItemRepository,
  ) {}
  public async operate(buildingId: string): Promise<BuildingOperationDto> {
    // Find the building in user Buildings
    const building: UserBuildingEntity | null =
      await this.userBuildingRepository.findById(buildingId);
    if (building === null) throw new BuildingNotFoundError(buildingId);

    const buildingEntity: BuildingEntity = building.getBuilding();
    const consumedItem: ItemEntity | null = await this.itemRepository.findById(
      buildingEntity.getConsumedItem(),
    );
    if (consumedItem === null) throw new Error('Item not found');
    const producedItem: ItemEntity | null = await this.itemRepository.findById(
      buildingEntity.getProducedItem(),
    );
    if (producedItem === null) throw new Error('Item not found');
    if (building.getRemainingTime() === 0 && building.isWorking()) {
      building.changeState(BuildingState.Finished);
    }
    if (building.isFinished()) {
      const userItem: UserItemEntity | null =
        this.userItemRepository.findByItem(producedItem.getId());
      // Either add Or Update
      if (userItem !== null) {
        await this.userItemRepository.updateItemIncrement(
          userItem.getId(),
          buildingEntity.getProducedItemAmount(),
        );
      } else {
        await this.userItemRepository.addItem(
          new UserItemEntity(
            'user-item-id-' +
              (this.userItemRepository.getUserItemLength() + 1).toString(),
            'user-id',
            producedItem,
            buildingEntity.getProducedItemAmount(),
          ),
        );
      }
      building.changeState(BuildingState.Idle);
    }
    if (building.isIdle()) {
      const userItem: UserItemEntity | null =
        this.userItemRepository.findByItem(consumedItem.getId());
      if (userItem !== null) {
        if (userItem.getItemCount() >= buildingEntity.getConsumedItemAmount()) {
          await this.userItemRepository.updateItemDecrement(
            userItem.getId(),
            buildingEntity.getConsumedItemAmount(),
          );
          building.startOperation();
        }
      }
    }

    return {
      id: building.getId(),
      state: building.getBuildingState().toString(),
      remainTime: building.getRemainingTime(),
    };
  }
}
