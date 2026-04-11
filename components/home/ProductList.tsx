"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/product";

function ProductList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <p className="mt-2 text-gray-600">
          Search and filter fresh agro products easily.
        </p>
      </div>

      <div className="glass-card mb-8 rounded-3xl p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 md:min-w-56"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            No products found
          </h3>
          <p className="mt-2 text-gray-600">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;