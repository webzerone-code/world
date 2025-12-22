import { BuildingState } from './building.state';

export class BuildingEntity {
  private id: string;
  private name: string;
  private description: string;

  private buildingItem: string; // connection

  // Level
  private level: number = 1;

  // Consumables
  private consumedItem: string; // connection
  private consumedItemAmount: number;
  private operationTime: number;
  // Production
  private producedItem: string; // connection
  private producedItemAmount: number;

  public constructor(
    id: string,
    name: string,
    description: string,
    buildingItem: string,
    level: number,
    consumedItem: string,
    consumedItemAmount: number,
    producedItem: string,
    producedItemAmount: number,
    operationTime: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.buildingItem = buildingItem;
    this.level = level;
    this.consumedItem = consumedItem;
    this.consumedItemAmount = consumedItemAmount;
    this.producedItem = producedItem;
    this.producedItemAmount = producedItemAmount;
    this.operationTime = operationTime;
  }
  public getOperationTime(): number {
    return this.operationTime;
  }
  getId(): string {
    return this.id;
  }
}
