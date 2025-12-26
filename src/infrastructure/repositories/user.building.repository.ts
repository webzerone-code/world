import { UserBuildingRepositoryInterface } from '../../domain/repositories/user.building.repository.interface';
import { UserBuildingEntity } from '../../domain/entities/userBuildings/user.building.entity';
import * as path from 'path'; // or import path from 'path';
import * as fs from 'fs';
import { BuildingRepository } from './building.repository';
import { BuildingEntity } from '../../domain/entities/building/building.entity';

export class UserBuildingRepository implements UserBuildingRepositoryInterface {
  private userBuildings: UserBuildingEntity[] = []; // this need change to be loaded by id dictionary

  public constructor(
    userBuildingsJson: string,
    buildingRepository: BuildingRepository,
  ) {
    const jsonPath = path.join(__dirname, '../storage', userBuildingsJson);
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const itemsData = JSON.parse(rawData);
    this.userBuildings = itemsData.map((i: any) => {
      const buildingDef: BuildingEntity | null = buildingRepository.findById(
        i.buildingId,
      );
      if (buildingDef == null)
        throw new Error(`BuildingDefinition not found: ${i.buildingId}`);
      return new UserBuildingEntity(
        i.id,
        i.userId,
        buildingDef,
        i.xLocation,
        i.yLocation,
      );
    });
  } // here we need user building json
  public addBuilding(building: UserBuildingEntity) {
    this.userBuildings.push(building);
  }
  public findAll(): Promise<UserBuildingEntity[] | null> {
    return Promise.resolve(this.userBuildings);
  }
  public getUserBuildingsCount(): number {
    return this.userBuildings.length;
  }
}
