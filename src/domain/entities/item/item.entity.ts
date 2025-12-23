import { ItemPrice } from './ItemPrice';
import { ItemType } from './item.type';

export class ItemEntity {
  private id: string;
  private name: string;
  private description: string;
  private itemType: ItemType;
  private previewImage: string;
  private connectionId?: string | null; // which this item refer to
  private itemPrice?: ItemPrice | null;

  public constructor(
    id: string,
    name: string,
    description: string,
    itemType: ItemType,
    previewImage: string,
    connectionId?: string,
    itemPrice?: ItemPrice,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.itemType = itemType;
    this.previewImage = previewImage;
    this.connectionId = connectionId;
    this.itemPrice = itemPrice;
  }

  getId(): string {
    return this.id;
  }
  getType(): ItemType {
    return this.itemType;
  }
  getPrice(): ItemPrice | null | undefined {
    return this.itemPrice;
  }
}
