"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;

  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getProductQuantity: (productId: number) => number;
  setProductQuantity: (productId: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const stored = localStorage.getItem("agro-cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("agro-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = Math.min(
          updated[existingIndex].quantity + qty,
          10
        );
        return updated;
      }

      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (index: number, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((_, i) => i !== index);
      }

      const updated = [...prev];
      updated[index].quantity = Math.min(quantity, 10);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("agro-cart");
  };
  const getProductQuantity = (productId: number) => {
    const item = cart.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const increaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
            ...item,
            quantity: Math.min(item.quantity + 1, 10),
          }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const setProductQuantity = (productId: number, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getProductQuantity,
        setProductQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}