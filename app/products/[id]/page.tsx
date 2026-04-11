import Image from "next/image";
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
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
             loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-green-600">{product.category}</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price}/{product.unit}
            </span>

            {product.originalPrice && (
              <span className="text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            ⭐ {product.rating} ({product.reviews} reviews)
          </p>

          <p
            className={`mt-3 font-medium ${
              product.isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.isAvailable ? "In Stock" : "Out of Stock"}
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}