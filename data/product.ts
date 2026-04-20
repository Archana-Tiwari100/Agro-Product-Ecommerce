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
      en: "Fresh Bananas",
      hi: "ताज़े केले",
    },
    category: {
      en: "Fruits",
      hi: "फल",
    },
    price: 60,
    originalPrice: 80,
    unit: {
      en: "dozen",
      hi: "दर्जन",
    },
    image: "/images/bananna.jpg",
    rating: 4.4,
    reviews: 95,
    description: {
      en: "Naturally sweet farm fresh bananas",
      hi: "प्राकृतिक मिठास वाले खेतों के ताज़े केले",
    },
    isAvailable: true,
  },
  {
    id: 3,
    name: {
      en: "Juicy Oranges",
      hi: "रसीले संतरे",
    },
    category: {
      en: "Fruits",
      hi: "फल",
    },
    price: 100,
    originalPrice: 130,
    unit: {
      en: "kg",
      hi: "किलो",
    },
    image: "/images/orange.jpg",
    rating: 4.6,
    reviews: 110,
    description: {
      en: "Juicy and vitamin-rich fresh oranges",
      hi: "रसीले और विटामिन से भरपूर ताज़े संतरे",
    },
    isAvailable: true,
  },

  {
    id: 4,
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
    id: 5,
    name: {
      en: "Fresh Carrots",
      hi: "ताज़ी गाजर",
    },
    category: {
      en: "Vegetables",
      hi: "सब्जियां",
    },
    price: 50,
    originalPrice: 70,
    unit: {
      en: "kg",
      hi: "किलो",
    },
    image: "/images/carrot.jpg",
    rating: 4.3,
    reviews: 76,
    description: {
      en: "Crunchy fresh carrots full of nutrition",
      hi: "पोषण से भरपूर कुरकुरी ताज़ी गाजर",
    },
    isAvailable: true,
  },
  {
    id: 6,
    name: {
      en: "Green Spinach",
      hi: "हरी पालक",
    },
    category: {
      en: "Vegetables",
      hi: "सब्जियां",
    },
    price: 30,
    originalPrice: 45,
    unit: {
      en: "bunch",
      hi: "गुच्छा",
    },
    image: "/images/spinach.jpg",
    rating: 4.4,
    reviews: 68,
    description: {
      en: "Fresh leafy spinach for healthy meals",
      hi: "स्वस्थ भोजन के लिए ताज़ी पत्तेदार पालक",
    },
    isAvailable: true,
  },

  {
    id: 7,
    name: {
      en: "Red Rice",
      hi: "लाल चावल",
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
    image: "/images/rice_new.jpg",
    rating: 4.7,
    reviews: 200,
    description: {
      en: "Nutritious premium quality red rice for healthy meals",
      hi: "स्वस्थ भोजन के लिए पौष्टिक प्रीमियम गुणवत्ता वाला लाल चावल",
    },
    isAvailable: true,
  },
  {
    id: 8,
    name: {
      en: "Organic Quinoa",
      hi: "ऑर्गेनिक क्विनोआ",
    },
    category: {
      en: "Grains",
      hi: "अनाज",
    },
    price: 180,
    originalPrice: 220,
    unit: {
      en: "kg",
      hi: "किलो",
    },
    image: "/images/quinoa.jpg",
    rating: 4.8,
    reviews: 145,
    description: {
      en: "Protein-rich organic quinoa for balanced nutrition",
      hi: "संतुलित पोषण के लिए प्रोटीन से भरपूर ऑर्गेनिक क्विनोआ",
    },
    isAvailable: true,
  },
  {
    id: 9,
    name: {
      en: "Ragi Millet",
      hi: "रागी बाजरा",
    },
    category: {
      en: "Grains",
      hi: "अनाज",
    },
    price: 70,
    originalPrice: 95,
    unit: {
      en: "kg",
      hi: "किलो",
    },
    image: "/images/ragi.jpg",
    rating: 4.6,
    reviews: 132,
    description: {
      en: "Healthy ragi millet rich in calcium and fiber",
      hi: "कैल्शियम और फाइबर से भरपूर स्वस्थ रागी बाजरा",
    },
    isAvailable: true,
  },

  {
    id: 10,
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
  {
    id: 11,
    name: {
      en: "Farm Fresh Curd",
      hi: "फार्म फ्रेश दही",
    },
    category: {
      en: "Dairy",
      hi: "डेयरी",
    },
    price: 50,
    originalPrice: 65,
    unit: {
      en: "box",
      hi: "डिब्बा",
    },
    image: "/images/curd.jpg",
    rating: 4.5,
    reviews: 88,
    description: {
      en: "Thick and fresh curd made from quality milk",
      hi: "गुणवत्ता वाले दूध से बना गाढ़ा और ताज़ा दही",
    },
    isAvailable: true,
  },
  {
    id: 12,
    name: {
      en: "Paneer",
      hi: "पनीर",
    },
    category: {
      en: "Dairy",
      hi: "डेयरी",
    },
    price: 90,
    originalPrice: 110,
    unit: {
      en: "pack",
      hi: "पैक",
    },
    image: "/images/paneer.jpg",
    rating: 4.6,
    reviews: 102,
    description: {
      en: "Soft and fresh paneer for everyday cooking",
      hi: "रोज़मर्रा के पकवानों के लिए मुलायम और ताज़ा पनीर",
    },
    isAvailable: true,
  },
];