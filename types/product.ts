export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  isAvailable: boolean;
}