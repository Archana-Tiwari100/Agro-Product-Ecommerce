import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
      ((product.originalPrice! - product.price) /
        product.originalPrice!) *
      100
    )
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="group overflow-hidden rounded-[28px] border border-white/60 bg-white/75 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(34,197,94,0.12)]">
        <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-70" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700 shadow-sm backdrop-blur-md">
              {product.category}
            </span>

            {hasDiscount && (
              <span className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                {discountPercentage}% Off
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="flex min-h-[56px] items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition group-hover:text-green-700">
              {product.name}
            </h3>

            <div className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 whitespace-nowrap">
              ⭐ {product.rating}
            </div>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
            {product.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              {product.reviews} reviews
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
              per {product.unit}
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-gray-900">
                  ₹{product.price}
                </span>

                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Fresh price for 1 {product.unit}
              </p>
            </div>
          </div>

          <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;