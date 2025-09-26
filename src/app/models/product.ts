import { Category } from "./category";

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  category: string | Category; // id o objeto poblado
}
