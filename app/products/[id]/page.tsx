import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/product";
import AddToCartButton from "@/components/products/AddToCartButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[32px] border border-white/60 bg-white/75 p-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-red-50 text-4xl">
            ⚠️
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Product not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            The product you are looking for does not exist or may have been removed.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const originalPrice = product.originalPrice;

  const hasDiscount =
    originalPrice !== undefined && originalPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  return (
    <div className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-lime-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-green-700 shadow-sm transition hover:bg-green-50"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="rounded-[34px] border border-white/60 bg-white/75 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
            <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-green-50 via-white to-emerald-50 md:h-[500px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />

              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700 shadow-sm">
                  {product.category}
                </span>

                {hasDiscount && (
                  <span className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                    {discountPercentage}% Off
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
              Premium Agro Product
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                ⭐ {product.rating} Rating
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                {product.reviews} Reviews
              </span>

              <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                Per {product.unit}
              </span>
            </div>

            <div className="mt-8 rounded-[28px] bg-gradient-to-r from-green-50 to-emerald-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Price
              </p>

              <div className="mt-3 flex items-end gap-3">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  ₹{product.price}
                </span>

                <span className="pb-1 text-sm font-medium text-gray-500">
                  / {product.unit}
                </span>

                {hasDiscount && (
                  <span className="pb-1 text-sm text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Availability
                </p>
                <p
                  className={`mt-2 text-base font-semibold ${
                    product.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.isAvailable ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Category
                </p>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  {product.category}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 rounded-[28px] border border-green-100 bg-green-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
                Why choose this product
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                <li>• Fresh quality selected for everyday use</li>
                <li>• Clean, healthy, and premium shopping experience</li>
                <li>• Ideal for regular kitchen and family needs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}