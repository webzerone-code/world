import {
  BadRequestException,
  Controller,
  Get,
  Body,
  Post,
} from '@nestjs/common';
import { UserBuildingsService } from './user.buildings.service';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';

@Controller('game/user/buildings')
export class UserBuildingsController {
  constructor(private readonly userBuildingsService: UserBuildingsService) {}

  @Get()
  async getAllUserBuildings(): Promise<UserBuildingEntity[] | null> {
    return await this.userBuildingsService.getAllUserBuildings();
  }

  @Post()
  buyBuilding(
    @Body('userId') userId: string,
    @Body('buildingId') buildingId: string,
  ) {
    try {
      this.userBuildingsService.buyBuilding(userId, buildingId);
      return {
        success: true,
      };
    } catch (error) {
      // optionally map domain errors to HTTP codes
      throw new BadRequestException(error.message);
    }
  }
}
