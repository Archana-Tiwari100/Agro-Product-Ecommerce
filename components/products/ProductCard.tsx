"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { useLanguage } from "@/components/context/LanguageContext";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useLanguage();

  const hasDiscount =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/75 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(34,197,94,0.12)]">
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Image
          src={product.image}
          alt={product.name[language]}
          fill
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-70" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700 shadow-sm backdrop-blur-md">
            {product.category[language]}
          </span>

          {hasDiscount && (
            <span className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
              {discountPercentage}% {t.products.off}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex min-h-[52px] items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-gray-900 transition group-hover:text-green-700">
            {product.name[language]}
          </h3>

          <div className="whitespace-nowrap rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
            ⭐ {product.rating}
          </div>
        </div>

        <p className="mt-3 min-h-[48px] line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description[language]}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
            {product.reviews} {t.products.reviews}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
            {t.products.per} {product.unit[language]}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              ₹{product.price}
            </span>

            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {t.products.freshPriceFor} 1 {product.unit[language]}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;