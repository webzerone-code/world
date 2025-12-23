import { ItemRepositoryInterface } from '../../domain/repositories/item.repository.interface';
import { ItemEntity } from '../../domain/entities/item/item.entity';
import { ItemType } from '../../domain/entities/item/item.type';
import * as path from 'path'; // or import path from 'path';
import * as fs from 'fs';
import { ItemPrice } from '../../domain/entities/item/ItemPrice';
import { ItemDTO } from '../persistence/json/item.dto';

export class ItemRepository implements ItemRepositoryInterface {
  private itemsEntities: ItemEntity[];

  public constructor(jsonItems: string) {
    const jsonPath: string = path.join(__dirname, '../storage', jsonItems);
    const rawData: string = fs.readFileSync(jsonPath, 'utf-8');
    const itemsData: ItemDTO[] = JSON.parse(rawData);
    this.itemsEntities = itemsData.map((i: ItemDTO) => {
      const price = i.itemPrice
        ? new ItemPrice(i.itemPrice.itemId, i.itemPrice.itemAmount)
        : undefined;

      //const ItemClass = ItemClassRegistry[i.itemType] ?? ItemEntity;

      return new ItemEntity(
        i.id,
        i.name,
        i.description,
        ItemType[i.itemType as keyof typeof ItemType],
        i.previewImage,
        i.connectionId ?? undefined,
        price,
      );
    });
  }

  loadAll(): Promise<ItemEntity[] | null> {
    return Promise.resolve(this.itemsEntities);
  }

  findById(id: string): Promise<ItemEntity | null> {
    const lookUpItem: ItemEntity | null =
      this.itemsEntities.find((i) => i.getId() === id) ?? null;
    return Promise.resolve(lookUpItem);
  }
  findByItemId(id: string): ItemEntity | null {
    const lookUpItem: ItemEntity | null =
      this.itemsEntities.find((i) => i.getId() === id) ?? null;
    return lookUpItem;
  }
  findItem(id: string): ItemEntity | null {
    const lookUpItem: ItemEntity | null =
      this.itemsEntities.find((i) => i.getId() === id) ?? null;
    return lookUpItem;
  }

  findByItemType(type: ItemType): Promise<ItemEntity[] | null> {
    const lookUpItem: ItemEntity[] | null =
      this.itemsEntities.filter((i) => i.getType() === type) ?? null;
    return Promise.resolve(lookUpItem);
  }
}
