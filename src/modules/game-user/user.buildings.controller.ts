import {
  BadRequestException,
  Controller,
  Get,
  Body,
  Post,
  Param,
} from '@nestjs/common';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';
import { UserBuildingsService } from '../../application/services/user.buildings.service';
import { BuildingOperationDto } from '../../infrastructure/persistence/responses/buildings/building.operation.dto';

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

  @Post(':buildingId/operate')
  async operateBuilding(
    @Param('buildingId') buildingId: string,
  ): Promise<BuildingOperationDto> {
    return await this.userBuildingsService.operateBuilding(buildingId);
  }
}
