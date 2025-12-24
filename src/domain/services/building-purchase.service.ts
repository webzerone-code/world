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
    length: number,
  ): UserBuildingEntity {
    // if (!building.isAvailable()) {
    //   throw new Error('Building is not available');
    // }
    // const buildingPrice = ;
    userItem.decrementItemCount(item.getPriceAmount());
    if (length <= 0) length = 1;
    else length += 1;
    return new UserBuildingEntity(
      'user-building-id-' + length.toString(),
      userId,
      building,
      0,
      0,
    );
  }
}
