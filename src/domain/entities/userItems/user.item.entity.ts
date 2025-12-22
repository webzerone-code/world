import { ItemEntity } from '../item/item.entity';

export class UserItemEntity {
  private id: string;
  private userId: string;
  private item: ItemEntity;
  private itemCount: number;
  constructor(id: string, userId: string, item: ItemEntity, itemCount: number) {
    this.id = id;
    this.userId = userId;
    this.item = item;
    this.itemCount = itemCount;
  }

  getItem(): ItemEntity {
    return this.item;
  }
}
