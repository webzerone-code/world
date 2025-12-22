import { ItemEntity } from '../entities/item/item.entity';
import { ItemType } from '../entities/item/item.type';

export interface ItemRepositoryInterface {
  findById(id: string): Promise<ItemEntity | null>;
  loadAll(): Promise<ItemEntity[] | null>;
  findByItemType(type: ItemType): Promise<ItemEntity[] | null>;
}
