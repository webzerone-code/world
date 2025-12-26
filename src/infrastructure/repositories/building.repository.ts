import { BuildingRepositoryInterface } from '../../domain/repositories-interfaces/building.repository.interface';
import { BuildingEntity } from '../../domain/entities/building/building.entity';
import * as path from 'path'; // or import path from 'path';
import * as fs from 'fs';
import { ItemRepository } from './item.repository';

export class BuildingRepository implements BuildingRepositoryInterface {
  private buildingEntity: BuildingEntity[];
  public constructor(jsonBuildings: string, itemRepository: ItemRepository) {
    const jsonPath: string = path.join(__dirname, '../storage', jsonBuildings);
    const rawData: string = fs.readFileSync(jsonPath, 'utf-8');
    const buildingsData = JSON.parse(rawData);
    this.buildingEntity = buildingsData.map((i) => {
      return new BuildingEntity(
        i.id,
        i.name,
        i.description,
        i.buildingItem,
        i.level,
        i.consumedItem,
        i.consumedItemAmount,
        i.producedItem,
        i.producedItemAmount,
        i.operationTime,
      );
    });
  }
  public findById(id: string): BuildingEntity | null {
    const lookUpItem: BuildingEntity | null =
      this.buildingEntity.find((i) => i.getId() === id) ?? null;
    return lookUpItem;
  }
  public loadAll(): Promise<BuildingEntity[] | null> {
    return Promise.resolve(this.buildingEntity);
  }
}
