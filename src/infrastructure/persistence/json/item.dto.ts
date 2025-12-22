export type ItemDTO = {
  id: string;
  name: string;
  description: string;
  itemType: string;
  previewImage: string;
  connectionId: string | null | undefined;
  itemPrice: {
    itemId: string;
    itemAmount: number;
  };
};
