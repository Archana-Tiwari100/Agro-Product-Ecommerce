"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/components/context/CartContext";
import { useAuth } from "@/components/context/AuthContext";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const firstName = user?.name?.split(" ")[0] || "Profile";

  const navLinkClass = (path: string) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition ${
      pathname === path
        ? "bg-green-100 text-green-700 shadow-sm"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-lime-400 text-xl shadow-[0_10px_30px_rgba(34,197,94,0.28)] transition duration-300 group-hover:scale-105 group-hover:rotate-3">
            🌿
          </div>

          <div className="hidden sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-green-600">
              Organic Store
            </p>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Agro
            </h1>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/70 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:flex">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>

          <Link href="/products" className={navLinkClass("/products")}>
            Products
          </Link>

          <Link
            href="/cart"
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              pathname === "/cart"
                ? "bg-green-100 text-green-700 shadow-sm"
                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            <span>Cart</span>

            <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-2 text-xs font-bold text-white shadow-sm">
              {cart.length}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="hidden items-center gap-3 rounded-full border border-white/70 bg-white/75 px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:bg-white md:flex"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-sm font-bold text-green-700">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div className="text-left leading-tight">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="max-w-[120px] truncate text-sm font-semibold text-gray-900">
                {firstName}
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-full bg-gradient-to-r from-red-50 to-rose-50 px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:-translate-y-0.5 hover:from-red-100 hover:to-rose-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="border-t border-white/50 bg-white/70 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <Link
            href="/"
            className={`flex-1 rounded-2xl px-3 py-2 text-center text-sm font-medium transition ${
              pathname === "/"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            Home
          </Link>

          <Link
            href="/products"
            className={`flex-1 rounded-2xl px-3 py-2 text-center text-sm font-medium transition ${
              pathname === "/products"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            Products
          </Link>

          <Link
            href="/cart"
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-center text-sm font-medium transition ${
              pathname === "/cart"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            <span>Cart</span>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-600 px-1.5 text-[10px] font-bold text-white">
              {cart.length}
            </span>
          </Link>

          <Link
            href="/profile"
            className={`flex-1 rounded-2xl px-3 py-2 text-center text-sm font-medium transition ${
              pathname === "/profile"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            {firstName}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;