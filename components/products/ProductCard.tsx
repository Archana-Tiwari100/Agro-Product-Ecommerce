import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group hover-lift overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm transition">
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
             loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Badge */}
          {product.originalPrice && (
            <span className="absolute top-3 left-3 rounded-full bg-green-600 px-3 py-1 text-xs text-white shadow">
              Sale
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-green-600">
            {product.category}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-gray-800">
            {product.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}/{product.unit}
            </span>

            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <p className="mt-2 text-sm text-gray-500">
            ⭐ {product.rating} ({product.reviews})
          </p>

          {/* Button */}
          <button className="mt-4 w-full rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;