import { UserBuildingRepository } from '../infrastructure/repositories/user.building.repository';
import { BuildingRepository } from '../infrastructure/repositories/building.repository';
import { BuildingEntity } from '../domain/entities/buidling/building.entity';
import { UserBuildingEntity } from '../domain/entities/userBuildings/user.building.entity';
import { BuildingPurchaseService } from '../domain/services/building-purchase.service';
import { BuildingNotFoundError } from '../domain/error/building-not-found.error';
import { UserItemRepository } from '../infrastructure/repositories/user.item.repository';
import { ItemRepository } from '../infrastructure/repositories/item.repository';
import { ItemPrice } from '../domain/entities/item/ItemPrice';
import { UserItemEntity } from '../domain/entities/userItems/user.item.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BuyBuildingUseCase {
  public constructor(
    private itemRepository: ItemRepository,
    private buildingRepository: BuildingRepository,
    private userItemRepository: UserItemRepository,
    private userBuildingRepository: UserBuildingRepository,
    private buildingPurchaseService: BuildingPurchaseService,
  ) {}
  public execute(userid: string, buildingId: string): void {
    const building: BuildingEntity | null =
      this.buildingRepository.findById(buildingId);
    if (building === null) throw new BuildingNotFoundError(buildingId);
    //The use case asks the Domain to perform the “buy building” business rule,
    // and the Domain returns the resulting ownership entity if the action is valid.

    // Get Item Price
    const itemId: string = building.getItemId();
    if (itemId == null) throw new Error('Item ID cannot be null');
    const item: ItemPrice | null | undefined = this.itemRepository
      .findByItemId(itemId)
      ?.getPrice();

    if (item === null || item === undefined)
      throw new Error(`Item with id ${itemId} not found`);
    const userItem: UserItemEntity | null = this.userItemRepository.findByItem(
      item.getItemId(),
    );
    if (userItem === null) throw new Error(`Item with id ${itemId} not found`);
    if (userItem.getItemCount() < item.getPriceAmount())
      throw new Error(`Not enough items to buy building`);

    const userBuilding: UserBuildingEntity = this.buildingPurchaseService.buy(
      userid,
      building,
      userItem,
      item,
      this.userBuildingRepository.getUserBuildingsCount(),
    );
    //this.userItemRepository.save(userItem); // gold/items deducted
    this.userBuildingRepository.addBuilding(userBuilding);
  }
}
