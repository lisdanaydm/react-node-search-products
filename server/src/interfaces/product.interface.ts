export interface Product {
  ID: number;
  name: string;
  price: number;
  qty: number;
  description: string;
  status: boolean;
  categoryID: number;
  tags: Array<string>;
}
