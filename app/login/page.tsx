export default function LoginPage() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-12">
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-green-300/40 blur-3xl" />

      <div className="glass-card fade-up relative w-full max-w-md rounded-3xl p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Login</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue shopping fresh agro products.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button className="hover-lift w-full rounded-2xl bg-green-600 py-3 font-medium text-white shadow-md hover:bg-green-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}