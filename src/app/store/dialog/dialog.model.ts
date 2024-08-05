import { Products } from '../../product/product.model';

export interface Category {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}
export interface Dialog {
  visable: boolean;
  productInfo: Products | {};
  specificCategory: Category[];
}
