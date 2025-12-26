import { ItemType } from '../entities/item/item.type';
import { ItemEntity } from '../entities/item/item.entity';

export interface UserItemRepositoryInterface {
  findAll(): Promise<ItemEntity[] | null>;
  // findByItemType(type: ItemType): Promise<ItemEntity[] | null>;
  // findById(id: string): Promise<ItemEntity | null>;
  // findByItemId(id: string): Promise<ItemEntity | null>;
  // removeItem(id: string): Promise<ItemEntity | null>;
  // addItem(item: ItemEntity): Promise<ItemEntity | null>;
}
