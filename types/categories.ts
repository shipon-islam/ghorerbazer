export interface subcategoryType {
  _id: string;
  name: string;
  slug: string;
  isDeleted: boolean;
  category: object;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  isDeleted: boolean;
  subcategory: subcategoryType[];
}
