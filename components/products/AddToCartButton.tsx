"use client";

import { Product } from "@/types/product";
import { useCart } from "@/components/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getProductQuantity,
    setProductQuantity
  } = useCart();

  const quantity = getProductQuantity(product.id);

  if (!product.isAvailable) {
    return (
      <button
        disabled
        className="w-full rounded-2xl bg-gray-200 py-3.5 text-sm font-semibold text-gray-400"
      >
        Out of Stock
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        onClick={() => addToCart(product)}
        className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 px-3 py-2">
      <button
        onClick={() => decreaseQuantity(product.id)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-green-700 shadow-sm transition hover:bg-green-100"
      >
        -
      </button>

      <input
        type="number"
        min={0}
        max={10}
        value={quantity}
        onChange={(e) => {
          let value = Number(e.target.value);
          if (Number.isNaN(value)) return;
          value = Math.max(0, Math.min(10, value));
          setProductQuantity(product.id, value);
        }}
        className="w-16 rounded-xl border border-green-200 bg-white px-2 py-2 text-center text-sm font-semibold text-gray-800 outline-none"
      />

      <button
        onClick={() => increaseQuantity(product.id)}
        disabled={quantity >= 10}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-green-700 shadow-sm transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}