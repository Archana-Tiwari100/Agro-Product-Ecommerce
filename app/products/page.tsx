import ProductList from "@/components/home/ProductList";

export default function ProductsPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-600">
          Browse fresh agro products from our collection.
        </p>
      </div>

      <ProductList />
    </main>
  );
}