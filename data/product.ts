import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: {
      en: "Fresh Apples",
      hi: "ताज़े सेब",
    },
    category: {
      en: "Fruits",
      hi: "फल",
    },
    price: 120,
    originalPrice: 150,
    unit: {
      en: "kg",
      hi: "किलो",
    },
    image: "/images/apple.jpg",
    rating: 4.5,
    reviews: 120,
    description: {
      en: "Fresh apples directly from farms",
      hi: "खेतों से सीधे ताज़े सेब",
    },
    isAvailable: true,
  },

  {
    id: 2,
    name: {
      en: "Organic Tomatoes",
      hi: "ऑर्गेनिक टमाटर",
    },
    category: {
      en: "Vegetables",
      hi: "सब्जियां",
    },
    price: 40,
    originalPrice: 60,
    unit: {
      en: "kg",
      hi: "किलो",
    },
    image: "/images/tomato.jpg",
    rating: 4.2,
    reviews: 80,
    description: {
      en: "Naturally grown organic tomatoes",
      hi: "प्राकृतिक रूप से उगाए गए ऑर्गेनिक टमाटर",
    },
    isAvailable: true,
  },

  {
    id: 3,
    name: {
      en: "Basmati Rice",
      hi: "बासमती चावल",
    },
    category: {
      en: "Grains",
      hi: "अनाज",
    },
    price: 90,
    originalPrice: 110,
    unit: {
      en: "kg",
      hi: "किलो",
    },
    image: "/images/rice.jpg",
    rating: 4.7,
    reviews: 200,
    description: {
      en: "Premium quality long grain basmati rice",
      hi: "प्रीमियम गुणवत्ता वाला लंबा बासमती चावल",
    },
    isAvailable: true,
  },

  {
    id: 4,
    name: {
      en: "Fresh Milk",
      hi: "ताज़ा दूध",
    },
    category: {
      en: "Dairy",
      hi: "डेयरी",
    },
    price: 60,
    unit: {
      en: "litre",
      hi: "लीटर",
    },
    image: "/images/milk.jpg",
    rating: 4.3,
    reviews: 95,
    description: {
      en: "Pure and fresh dairy milk",
      hi: "शुद्ध और ताज़ा डेयरी दूध",
    },
    isAvailable: true,
  },
];