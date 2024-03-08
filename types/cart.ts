import { TProduct } from "./product";

export interface cartItemType {
  _id: string;
  user: string;
  product: TProduct;
  subTotal: number;
  quantity: number;
  totalAmount: number;
}

export type cartAddType = {
  user: string;
  product: string;
  subTotal: number;
  quantity: number;
  totalAmount: number;
};
