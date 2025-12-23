import { Controller, Get, Param } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingEntity } from '../../domain/entities/buidling/building.entity';

@Controller('game/buildings')
export class BuildingsController {
  constructor(private buildingsService: BuildingsService) {}

  @Get()
  async allBuildings(): Promise<BuildingEntity[] | null> {
    return await this.buildingsService.allBuildings();
  }

  @Get(':id')
  getById(@Param('id') id: string): BuildingEntity | null {
    return this.buildingsService.findById(id);
  }
}
