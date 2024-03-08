export interface TProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  cover: string;
  images: string[];
  discount: number;
  rating: number;
  category: string;
  subcategory: string;
  reviews: any[];
  createdAt: Date;
  updatedAt: Date;
}
export type TsearchParams = { [key: string]: string | string[] | undefined };
