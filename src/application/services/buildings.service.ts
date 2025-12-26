import { Injectable } from '@nestjs/common';
import { BuildingRepository } from '../../infrastructure/repositories/building.repository';
import { BuildingEntity } from '../../domain/entities/building/building.entity';

@Injectable()
export class BuildingsService {
  constructor(private buildingRepository: BuildingRepository) {}

  async allBuildings(): Promise<BuildingEntity[] | null> {
    return await this.buildingRepository.loadAll();
  }
  findById(id: string): BuildingEntity | null {
    return this.buildingRepository.findById(id);
  }
}
