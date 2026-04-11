"use client";

import { Product } from "@/types/product";
import { useCart } from "@/components/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
    >
      Add to Cart
    </button>
  );
}