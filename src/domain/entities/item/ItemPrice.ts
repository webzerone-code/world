export class ItemPrice {
  private itemAmount: number;
  private itemId: string;

  public constructor(itemId: string, itemAmount: number) {
    this.itemAmount = itemAmount;
    this.itemId = itemId;
  }
}
