export class ItemPrice {
  private itemAmount: number;
  private itemId: string;

  public constructor(itemId: string, itemAmount: number) {
    this.itemAmount = itemAmount;
    this.itemId = itemId;
  }
  public getPriceAmount(): number {
    return this.itemAmount;
  }
  public getItemId(): string {
    return this.itemId;
  }
}
