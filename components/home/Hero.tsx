import Link from "next/link";

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <p className="inline-flex rounded-full bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-green-700">
            Fresh from farms
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl xl:text-6xl">
            Fresh & Organic Agro Products for Everyday Life
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base lg:max-w-xl">
            Explore handpicked fruits, vegetables, grains, and daily essentials
            with a premium shopping experience that feels fresh, clean, and
            modern.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="/products"
              className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
            >
              Shop Now
            </Link>

            <Link
              href="/products"
              className="rounded-2xl border border-green-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-green-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-green-50"
            >
              Explore Categories
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <div className="rounded-2xl border border-white/60 bg-white/75 px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
                Organic Picks
              </p>
            </div>

            <div className="rounded-2xl border border-white/60 bg-white/75 px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
              <p className="text-2xl font-bold text-gray-900">Fresh</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
                Daily Essentials
              </p>
            </div>

            <div className="rounded-2xl border border-white/60 bg-white/75 px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
              <p className="text-2xl font-bold text-gray-900">Fast</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
                Easy Shopping
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[36px] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(22,101,52,0.10)] backdrop-blur-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[28px] bg-gradient-to-br from-green-100 to-emerald-50 p-6 text-center">
                <div className="text-5xl">🍎</div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Fresh Fruits
                </p>
              </div>

              <div className="rounded-[28px] bg-gradient-to-br from-emerald-100 to-lime-50 p-6 text-center">
                <div className="text-5xl">🥦</div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Green Veggies
                </p>
              </div>

              <div className="rounded-[28px] bg-gradient-to-br from-lime-100 to-yellow-50 p-6 text-center">
                <div className="text-5xl">🌾</div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Healthy Grains
                </p>
              </div>

              <div className="rounded-[28px] bg-gradient-to-br from-green-50 to-emerald-100 p-6 text-center">
                <div className="text-5xl">🥛</div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Daily Dairy
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 -right-3 rounded-2xl bg-white/85 px-4 py-3 shadow-lg backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
              Fresh Quality
            </p>
            <p className="mt-1 text-sm font-bold text-gray-900">
              Farm-to-home feel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;