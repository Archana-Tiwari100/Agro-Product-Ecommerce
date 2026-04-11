"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="relative px-6 py-16">
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-green-300/30 blur-3xl" />

      <div className="fade-up relative mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
            Shopping Cart
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Cart
          </h1>
          <p className="mt-2 text-gray-600">
            Review your selected products before moving ahead.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="glass-card mx-auto max-w-2xl rounded-3xl p-10 text-center">
            <div className="text-5xl">🛒</div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Add fresh products from our collection to see them here.
            </p>

            <Link
              href="/products"
              className="hover-lift mt-6 inline-block rounded-2xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-5">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="glass-card flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                         sizes="96px"
                          loading="eager"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-green-600">
                        {item.category}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        ₹{item.price}/{item.unit}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="rounded-2xl border border-red-200 bg-white/70 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="glass-card h-fit rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Total Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                    <span>Total Price</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <button className="hover-lift mt-6 w-full rounded-2xl bg-green-600 py-3 font-medium text-white hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}