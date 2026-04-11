function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-green-300/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center fade-up">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-600">
          Fresh from farms
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          Fresh & Organic Agro Products for Everyday Life
        </h1>

        <p className="mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
          Explore fresh fruits, vegetables, grains, and daily essentials with a
          clean and modern shopping experience.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="hover-lift rounded-full bg-green-600 px-8 py-3 text-sm font-medium text-white shadow-md hover:bg-green-700">
            Shop Now
          </button>

          <button className="hover-lift rounded-full border border-green-600 px-8 py-3 text-sm font-medium text-green-600 hover:bg-green-100">
            Explore Categories
          </button>
        </div>

        {/* Floating decorative icon */}
        <div className="mt-12 text-5xl float-soft">🌿</div>
      </div>
    </section>
  );
}

export default Hero;