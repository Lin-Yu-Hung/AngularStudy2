export interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: string; count: number };
}
export interface ProductInfo {
  products: Products[];
  categorys: string[];
  error: boolean;
}
