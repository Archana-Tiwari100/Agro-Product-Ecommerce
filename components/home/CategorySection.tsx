function CategorySection() {
  const categories = [
    { name: "Fruits", icon: "🍎" },
    { name: "Vegetables", icon: "🥦" },
    { name: "Grains", icon: "🌾" },
    { name: "Dairy", icon: "🥛" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 text-center fade-in">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
          Categories
        </p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((item) => (
          <div
            key={item.name}
            className="group hover-lift glass-card cursor-pointer rounded-2xl p-6 text-center"
          >
            <div className="text-4xl transition duration-300 group-hover:scale-110 group-hover:-translate-y-1">
              {item.icon}
            </div>

            <p className="mt-4 text-lg font-semibold text-gray-800">
              {item.name}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Fresh daily essentials
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;