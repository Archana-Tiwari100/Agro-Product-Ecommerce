export type Product = {
  id: number;

  name: {
    en: string;
    hi: string;
  };

  category: {
    en: string;
    hi: string;
  };

  description: {
    en: string;
    hi: string;
  };

  price: number;
  originalPrice?: number;
  unit: {
    en: string;
    hi: string;
  };

  image: string;
  rating: number;
  reviews: number;
  isAvailable: boolean;
};