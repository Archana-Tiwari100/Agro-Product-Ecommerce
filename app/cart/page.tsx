"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";
import { useLanguage } from "@/components/context/LanguageContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    setProductQuantity,
    removeFromCart,
  } = useCart();

  const { t, language } = useLanguage();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-lime-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-600">
            {t.cart.badge}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {t.cart.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
            {t.cart.subtitle}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-[32px] border border-white/60 bg-white/70 p-10 text-center shadow-[0_20px_80px_rgba(22,101,52,0.08)] backdrop-blur-2xl md:p-14">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-green-100 to-emerald-100 text-5xl shadow-inner">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 md:text-3xl">
              {t.cart.emptyTitle}
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base">
              {t.cart.emptySub}
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
            >
              {t.cart.browseProducts}
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.7fr_0.95fr]">
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="group rounded-[30px] border border-white/60 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(34,197,94,0.10)] sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className="relative h-24 w-24 overflow-hidden rounded-[24px] bg-gradient-to-br from-green-50 to-white ring-1 ring-green-100 sm:h-28 sm:w-28">
                        <Image
                          src={item.product.image}
                          alt={item.product.name[language]}
                          fill
                          sizes="112px"
                          loading="eager"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700">
                          {item.product.category[language]}
                        </p>

                        <h2 className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">
                          {item.product.name[language]}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                          {t.cart.itemSub}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                          <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                            ₹{item.product.price}
                          </span>
                          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                            {t.products.per} {item.product.unit[language]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </p>

                      <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 px-3 py-2">
                        <button
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-green-700 shadow-sm transition hover:bg-green-100"
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={item.quantity}
                          onChange={(e) => {
                            let value = Number(e.target.value);

                            if (Number.isNaN(value)) return;

                            value = Math.max(0, Math.min(10, value));

                            setProductQuantity(item.product.id, value);
                          }}
                          className="w-16 rounded-xl border border-green-200 bg-white px-2 py-2 text-center text-sm font-semibold text-gray-800 outline-none"
                        />

                        <button
                          onClick={() => increaseQuantity(item.product.id)}
                          disabled={item.quantity >= 10}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-green-700 shadow-sm transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        {t.cart.removeItem}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
                {t.cart.orderSummary}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {t.cart.summary}
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-green-50/70 px-4 py-3 text-sm text-gray-700">
                  <span>{t.cart.totalItems}</span>
                  <span className="font-semibold text-gray-900">
                    {totalItems}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-green-50/70 px-4 py-3 text-sm text-gray-700">
                  <span>{t.cart.delivery}</span>
                  <span className="font-semibold text-emerald-700">
                    {t.cart.free}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-green-50/70 px-4 py-3 text-sm text-gray-700">
                  <span>{t.cart.packaging}</span>
                  <span className="font-semibold text-gray-900">
                    {t.cart.included}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700">
                      {t.cart.totalPrice}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{total}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {t.cart.taxes}
                  </p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-7 block w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
              >
                {t.cart.checkout}
              </Link>

              <Link
                href="/products"
                className="mt-4 block w-full rounded-2xl border border-green-200 bg-white py-3 text-center text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                {t.cart.continueShopping}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}