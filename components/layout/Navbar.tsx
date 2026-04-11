"use client";

import Link from "next/link";
import { useCart } from "@/components/context/CartContext";

function Navbar() {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-bold text-green-700"
        >
          <span className="inline-block transition duration-300 group-hover:rotate-6 group-hover:scale-110">
            🌿
          </span>
          <span className="tracking-tight">Agro</span>
        </Link>

        <nav>
          <ul className="flex items-center gap-3 text-sm font-medium text-gray-700 md:gap-6">
            <li>
              <Link
                href="/"
                className="rounded-full px-3 py-2 transition hover:bg-green-50 hover:text-green-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="rounded-full px-3 py-2 transition hover:bg-green-50 hover:text-green-700"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="rounded-full px-3 py-2 transition hover:bg-green-50 hover:text-green-700"
              >
                Cart
                <span className="ml-2 rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                  {cart.length}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 transition hover:bg-green-50 hover:text-green-700"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="rounded-full px-3 py-2 transition hover:bg-green-50 hover:text-green-700"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;