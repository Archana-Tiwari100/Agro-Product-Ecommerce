"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/context/CartContext";
import { useAuth } from "@/components/context/AuthContext";
import { useLanguage } from "@/components/context/LanguageContext";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const firstName = user?.name?.split(" ")[0] || t.nav.profile;
  const cartCount = cart.length;

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/products", label: t.nav.products },
    { href: "/cart", label: t.nav.cart, badge: cartCount },
    { href: "/profile", label: firstName },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 shadow-[0_12px_35px_rgba(15,23,42,0.10)] backdrop-blur-2xl border-b border-white/60"
          : "bg-white/65 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "py-3" : "py-4"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-lime-400 text-xl shadow-[0_14px_35px_rgba(34,197,94,0.30)] transition duration-300 group-hover:scale-105 group-hover:rotate-3">
              🌿
            </div>

            <div className="hidden sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-green-600">
                {t.nav.organicStore}
              </p>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Agro
              </h1>
            </div>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                    >
                      <span>{item.label}</span>

                      {typeof item.badge === "number" && (
                        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-2 text-xs font-bold text-white">
                          {item.badge}
                        </span>
                      )}

                      <span
                        className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-green-600 transition-all duration-300 ${
                          isActive
                            ? "w-8 opacity-100"
                            : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-green-50"
            >
              {language === "en" ? "हिंदी" : "English"}
            </button>

            <button
              onClick={handleLogout}
              className="rounded-full bg-gradient-to-r from-red-50 to-rose-50 px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:from-red-100 hover:to-rose-100"
            >
              {t.nav.logout}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/75 text-gray-700 shadow-sm transition hover:bg-green-50 md:hidden"
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "top-2.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "top-2.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileMenuOpen ? "max-h-[420px] pb-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3 rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <span>{item.label}</span>

                  {typeof item.badge === "number" && (
                    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-2 text-xs font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
              >
                {language === "en" ? "हिंदी" : "English"}
              </button>

              <button
                onClick={handleLogout}
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
              >
                {t.nav.logout}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}

export default Navbar;