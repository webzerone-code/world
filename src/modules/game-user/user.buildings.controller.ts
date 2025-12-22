import { Controller, Get } from '@nestjs/common';
import { UserBuildingsService } from './user.buildings.service';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';

@Controller('game/user/buildings')
export class UserBuildingsController {
  constructor(private readonly userBuildingsService: UserBuildingsService) {}

  @Get()
  async getAllUserBuildings(): Promise<UserBuildingEntity[] | null> {
    return await this.userBuildingsService.getAllUserBuildings();
  }
}
