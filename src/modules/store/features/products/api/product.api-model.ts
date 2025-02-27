export type ProductAPIModel = {
  id: string;
  description: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  stock: number;
  categories: string[];
  sizes: string[];
  colors: string[];
  quantity: number;
};
