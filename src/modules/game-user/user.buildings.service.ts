import { Injectable } from '@nestjs/common';
import { UserBuildingRepository } from '../../infrastructure/repositories/user.building.repository';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';

@Injectable()
export class UserBuildingsService {
  public constructor(
    private readonly userBuildingRepository: UserBuildingRepository,
  ) {}

  public async getAllUserBuildings(): Promise<UserBuildingEntity[] | null> {
    return await this.userBuildingRepository.findAll();
  }
}
