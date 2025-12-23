import { BuildingEntity } from '../entities/buidling/building.entity';
import { UserBuildingEntity } from '../entities/userBuildings/user.building.entity';
import { Injectable } from '@nestjs/common';
import { UserItemEntity } from '../entities/userItems/user.item.entity';
import { ItemPrice } from '../entities/item/ItemPrice';

@Injectable()
export class BuildingPurchaseService {
  buy(
    userId: string,
    building: BuildingEntity,
    userItem: UserItemEntity,
    item: ItemPrice,
  ): UserBuildingEntity {
    // if (!building.isAvailable()) {
    //   throw new Error('Building is not available');
    // }
    // const buildingPrice = ;
    userItem.decrementItemCount(item.getPriceAmount());
    return new UserBuildingEntity('user-building-id', userId, building, 0, 0);
  }
}
