import { BuildingEntity } from '../building/building.entity';
import { BuildingState } from '../building/building.state';

export class UserBuildingEntity {
  private id: string;
  private userId: string;
  private building: BuildingEntity;
  // Location
  private xLocation: number;
  private yLocation: number;

  private startTime: number | null = null;
  private endTime: number | null = null;
  private buildingState: BuildingState = BuildingState.Idle;
  constructor(
    id: string,
    userId: string,
    building: BuildingEntity,
    xLocation: number,
    yLocation: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.building = building;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
  }

  public getBuilding(): BuildingEntity {
    return this.building;
  }

  public changeState(newState: BuildingState): void {
    this.buildingState = newState;
  }
  public startOperation(): void {
    if (this.buildingState !== BuildingState.Idle) {
      throw new Error('Building is not idle');
    }
    this.startTime = Date.now();
    this.endTime = this.startTime + this.building.getOperationTime();
    this.changeState(BuildingState.Working);
  }
  // The building behavior belongs to the userEntity not building entity
}
