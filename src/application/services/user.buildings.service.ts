import { Injectable } from '@nestjs/common';
import { UserBuildingRepository } from '../../infrastructure/repositories/user.building.repository';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';
import { BuyBuildingUseCase } from '../usecases/buy.building.usecase';
import { OperateBuildingUseCase } from '../usecases/operate.building.usecase';
import { BuildingOperationDto } from '../../infrastructure/persistence/responses/buildings/building.operation.dto';

@Injectable()
export class UserBuildingsService {
  public constructor(
    private readonly userBuildingRepository: UserBuildingRepository,
    private readonly buyBuildingUseCase: BuyBuildingUseCase,
    private readonly operateBuildingUseCase: OperateBuildingUseCase,
  ) {}

  public async getAllUserBuildings(): Promise<UserBuildingEntity[] | null> {
    return await this.userBuildingRepository.findAll();
  }

  public buyBuilding(userId: string, buildingId: string): void {
    this.buyBuildingUseCase.execute(userId, buildingId);
  }

  public async operateBuilding(
    buildingId: string,
  ): Promise<BuildingOperationDto> {
    return this.operateBuildingUseCase.operate(buildingId);
  }
}
