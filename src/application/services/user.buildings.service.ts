import { Injectable } from '@nestjs/common';
import { UserBuildingRepository } from '../../infrastructure/repositories/user.building.repository';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';
import { BuyBuildingUseCase } from '../usecases/buy.building.usecase';

@Injectable()
export class UserBuildingsService {
  public constructor(
    private readonly userBuildingRepository: UserBuildingRepository,
    private readonly buyBuildingUseCase: BuyBuildingUseCase,
  ) {}

  public async getAllUserBuildings(): Promise<UserBuildingEntity[] | null> {
    return await this.userBuildingRepository.findAll();
  }

  public buyBuilding(userId: string, buildingId: string): void {
    this.buyBuildingUseCase.execute(userId, buildingId);
  }
}
