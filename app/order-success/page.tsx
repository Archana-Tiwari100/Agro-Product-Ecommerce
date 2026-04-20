"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type OrderData = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: string;
  total: number;
  items: number;
};

type ConfettiPiece = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
  duration: number;
  delay: number;
  size: number;
};

const emojis = ["🌾", "🍎", "🥦", "🥛", "🌿", "🍅", "🧺", "🌱"];

function OrderSuccessPageInner() {
  const router = useRouter();

  const [pieces] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: 56 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 180 + Math.random() * 420;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - (80 + Math.random() * 140);

      return {
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x,
        y,
        rotate: -360 + Math.random() * 720,
        duration: 2200 + Math.random() * 1400,
        delay: Math.random() * 220,
        size: 22 + Math.random() * 18,
      };
    })
  );

  const order = useMemo<OrderData | null>(() => {
    try {
      const stored = localStorage.getItem("agro-last-order");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const paymentLabel =
    order?.paymentMethod === "upi"
      ? "UPI"
      : order?.paymentMethod === "card"
      ? "Card"
      : order?.paymentMethod === "cod"
      ? "Cash on Delivery"
      : order?.paymentMethod ?? "-";

  return (
    <div className="relative overflow-hidden px-6 py-20 md:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {pieces.map((piece) => (
          <span
            key={piece.id}
            className="absolute left-1/2 top-[32%] animate-agro-burst"
            style={
              {
                "--burst-x": `${piece.x}px`,
                "--burst-y": `${piece.y}px`,
                "--burst-rotate": `${piece.rotate}deg`,
                animationDuration: `${piece.duration}ms`,
                animationDelay: `${piece.delay}ms`,
                fontSize: `${piece.size}px`,
              } as React.CSSProperties
            }
          >
            {piece.emoji}
          </span>
        ))}
      </div>

      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-[36px] border border-white/60 bg-white/75 p-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-14">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-5xl text-white shadow-lg">
            ✓
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Order Placed Successfully
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
            Thank you for shopping with Agro. Your fresh order is confirmed and
            will be delivered soon.
          </p>

          <div suppressHydrationWarning>
            {order && (
              <div className="mt-8 rounded-[28px] bg-green-50/70 p-6 text-left">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Details
                </h2>

                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Name:</span> {order.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {order.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> {order.address},{" "}
                    {order.city} - {order.pincode}
                  </p>
                  <p>
                    <span className="font-semibold">Items:</span> {order.items}
                  </p>
                  <p>
                    <span className="font-semibold">Payment:</span> {paymentLabel}
                  </p>
                  <p>
                    <span className="font-semibold">Total:</span> ₹{order.total}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => router.push("/")}
              className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
            >
              Go to Home
            </button>

            <button
              onClick={() => router.push("/products")}
              className="rounded-2xl border border-green-200 bg-white px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(OrderSuccessPageInner), {
  ssr: false,
});