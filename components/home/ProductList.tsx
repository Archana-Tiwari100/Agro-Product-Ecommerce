"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/product";
import { useLanguage } from "@/components/context/LanguageContext";

function ProductList() {
  const { t, language } = useLanguage();

  const allLabel = t.products.all;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(allLabel);

  const categories = [
    allLabel,
    ...new Set(products.map((item) => item.category[language])),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const productCategory = item.category[language];
      const productName = item.name[language];

      const matchesCategory =
        selectedCategory === allLabel || productCategory === selectedCategory;

      const matchesSearch = productName
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, language, allLabel]);

  const handleReset = () => {
    setSearch("");
    setSelectedCategory(allLabel);
  };

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-14 md:py-20">
      <div className="absolute -top-12 -left-10 h-40 w-40 rounded-full bg-green-100/50 blur-3xl" />
      <div className="absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-600">
            {t.products.badge}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {t.products.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            {t.products.subtitle}
          </p>
        </div>

        <div className="mb-10 rounded-[30px] border border-white/60 bg-white/75 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t.products.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>

              <div className="relative md:min-w-[240px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  ▾
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 lg:justify-end">
              <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {filteredProducts.length}{" "}
                {filteredProducts.length !== 1
                  ? t.products.products
                  : t.products.product}
              </div>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[30px] border border-white/60 bg-white/75 p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-green-100 to-emerald-100 text-4xl">
              🌿
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              {t.products.noProducts}
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-600 md:text-base">
              {t.products.noProductsSub}
            </p>

            <button
              onClick={handleReset}
              className="mt-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
            >
              {t.products.resetFilters}
            </button>
          </div>
        ) : (
       <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;