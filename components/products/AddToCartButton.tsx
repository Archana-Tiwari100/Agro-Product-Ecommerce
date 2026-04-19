"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/components/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={!product.isAvailable}
      className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-semibold transition duration-300 ${
        product.isAvailable
          ? added
            ? "bg-emerald-600 text-white"
            : "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-200 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
          : "cursor-not-allowed bg-gray-200 text-gray-400"
      }`}
    >
      {product.isAvailable
        ? added
          ? "✓ Added to Cart"
          : "Add to Cart"
        : "Out of Stock"}
    </button>
  );
}