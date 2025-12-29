import { UserItemRepositoryInterface } from '../../domain/repositories-interfaces/user.item.repository.interface';
import { ItemEntity } from '../../domain/entities/item/item.entity';
import * as path from 'path'; // or import path from 'path';
import * as fs from 'fs';
import { ItemPrice } from '../../domain/entities/item/ItemPrice';
import { UserItemEntity } from '../../domain/entities/userItems/user.item.entity';
import { ItemRepository } from './item.repository';

export class UserItemRepository implements UserItemRepositoryInterface {
  private userItems: UserItemEntity[]; // this need change to be loaded by id dictionary

  public constructor(
    jsonUserItems: string,
    private itemRepository: ItemRepository,
  ) {
    const jsonPath = path.join(__dirname, '../storage', jsonUserItems);
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const itemsData = JSON.parse(rawData);
    this.userItems = itemsData.map((i: any) => {
      const price = i.itemPrice
        ? new ItemPrice(i.item.itemPrice.itemId, i.item.itemPrice.itemAmount)
        : undefined;
      const item = this.itemRepository.findItem(i.itemId);
      if (item == null) throw new Error(`Item with id ${i.itemId} not found`);
      //const ItemClass = ItemClassRegistry[i.itemType] ?? ItemEntity;

      return new UserItemEntity(i.id, i.userId, item, i.itemCount);
    });
  }
  async addItem(item: UserItemEntity): Promise<void> {
    this.userItems.push(item);
  }
  async updateItemIncrement(id: string, amount: number): Promise<void> {
    const index = this.userItems.findIndex((i) => i.getId() === id);
    if (index !== -1) {
      this.userItems[index].incrementItemCount(amount);
    }
  }
  async updateItemDecrement(id: string, amount: number): Promise<void> {
    const index = this.userItems.findIndex((i) => i.getId() === id);
    if (index !== -1) {
      this.userItems[index].decrementItemCount(amount);
    }
  }
  findAll(): Promise<ItemEntity[] | null> {
    const items: ItemEntity[] | null = this.userItems.map((i: UserItemEntity) =>
      i.getItem(),
    );
    return Promise.resolve(items);
  }

  public findALlUserItems(): Promise<UserItemEntity[] | null> {
    return Promise.resolve(this.userItems);
  }
  public findByItem(id: string): UserItemEntity | null {
    const lookUpItem =
      this.userItems.find((i) => i.getItem().getId() === id) ?? null;
    return lookUpItem;
  }
  public getUserItemLength(): number {
    return this.userItems.length;
  }
}
