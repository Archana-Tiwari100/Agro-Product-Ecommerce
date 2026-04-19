"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-lime-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_20px_80px_rgba(22,101,52,0.10)] backdrop-blur-2xl">
          <div className="relative border-b border-green-100 bg-gradient-to-r from-green-600 via-emerald-600 to-lime-500 px-6 py-10 text-white md:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/30 bg-white/20 text-4xl shadow-lg backdrop-blur-md">
                  👤
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-100">
                    My Profile
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                    {user.name}
                  </h1>
                  <p className="mt-2 text-sm text-green-50/90">
                    Welcome back to your Agro account
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3 md:p-10">
            <div className="md:col-span-2">
              <div className="rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
                      Personal Details
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                      Account Information
                    </h2>
                  </div>

                  <button className="rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100">
                    Edit Profile
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Full Name
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {user.name}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email Address
                    </p>
                    <p className="mt-2 break-words text-base font-semibold text-gray-900">
                      {user.email}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Phone Number
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {user.phone}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Address
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {user.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
                  Account Status
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  Active Account
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Your profile is active and ready to explore fresh agro
                  products, cart items, and orders.
                </p>

                <div className="mt-5 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Logged In
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
                  Quick Actions
                </p>

                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => router.push("/")}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    Go to Home
                  </button>

                  <button
                    onClick={() => router.push("/cart")}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    View Cart
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Logout from Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}