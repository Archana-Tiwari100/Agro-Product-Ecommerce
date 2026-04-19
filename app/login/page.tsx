"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      setError("");
      router.push("/");
    } else {
      setError("Invalid email or password");
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f6fff8_0%,#ecfdf3_45%,#f0fdf4_100%)] px-6 py-12">
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-lime-200/40 blur-3xl" />

      <div
        className={`relative w-full max-w-md rounded-[28px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_80px_rgba(22,101,52,0.12)] backdrop-blur-2xl ${
          shake ? "animate-shake" : ""
        }`}
      >
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-3xl shadow-lg">
            🌿
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Login to Agro
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Sign in to continue shopping fresh and organic products.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              className="peer w-full rounded-2xl border border-gray-200 bg-white/80 px-4 pt-6 pb-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
            <label
              htmlFor="email"
              className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-green-700 transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-green-700"
            >
              Email address
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              className="peer w-full rounded-2xl border border-gray-200 bg-white/80 px-4 pt-6 pb-2.5 pr-12 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
            <label
              htmlFor="password"
              className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-green-700 transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-green-700"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-green-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.584 10.587a2 2 0 102.829 2.829"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-1.01 2.27-2.77 4.2-5 5.4M6.61 6.61C4.38 7.84 2.62 9.76 1.62 12c.69 1.56 1.73 2.98 3.02 4.14"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M1.5 12S5.5 4.5 12 4.5 22.5 12 22.5 12 18.5 19.5 12 19.5 1.5 12 1.5 12z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
          >
            Login
          </button>

          <div className="rounded-2xl border border-green-100 bg-green-50/80 px-4 py-3 text-center text-xs leading-6 text-gray-600">
            <span className="font-semibold text-green-700">Demo Login:</span>{" "}
            admin@gmail.com / admin123
          </div>
        </form>
      </div>
    </div>
  );
}