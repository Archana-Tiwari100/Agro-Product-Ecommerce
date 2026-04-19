function CategorySection() {
  const categories = [
    {
      name: "Fruits",
      icon: "🍎",
      subtitle: "Sweet and juicy picks",
    },
    {
      name: "Vegetables",
      icon: "🥦",
      subtitle: "Fresh green essentials",
    },
    {
      name: "Grains",
      icon: "🌾",
      subtitle: "Healthy pantry basics",
    },
    {
      name: "Dairy",
      icon: "🥛",
      subtitle: "Daily wholesome goodness",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-14 md:py-18">
      <div className="absolute -top-10 left-0 h-40 w-40 rounded-full bg-green-100/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-600">
            Categories
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Browse curated essentials across your favorite daily food
            categories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((item) => (
            <div
              key={item.name}
              className="group cursor-pointer rounded-[30px] border border-white/60 bg-white/75 p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(34,197,94,0.10)]"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-green-100 via-white to-emerald-100 text-4xl transition duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                {item.icon}
              </div>

              <p className="mt-5 text-xl font-bold text-gray-900 transition group-hover:text-green-700">
                {item.name}
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.subtitle}
              </p>

              <div className="mt-5 inline-flex rounded-full bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-green-700">
                Explore
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;