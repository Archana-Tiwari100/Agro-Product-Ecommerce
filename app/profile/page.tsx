"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import { useLanguage } from "@/components/context/LanguageContext";

type OrderProduct = {
  id: number;
  name: {
    en: string;
    hi: string;
  };
  category: {
    en: string;
    hi: string;
  };
  unit: {
    en: string;
    hi: string;
  };
  price: number;
  quantity: number;
  image: string;
};

type OrderItem = {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: string;
  total: number;
  items: number;
  status: "Delivered" | "Processing" | "Packed";
  createdAt: string;
  products: OrderProduct[];
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();

  const [orders] = useState<OrderItem[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const storedOrders = localStorage.getItem("agro-orders");
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error("Failed to read order history", error);
      return [];
    }
  });

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const statusLabel = (status: OrderItem["status"]) => {
    if (language === "hi") {
      if (status === "Delivered") return "डिलीवर हुआ";
      if (status === "Processing") return "प्रोसेसिंग में";
      return "पैक किया गया";
    }

    return status;
  };

  const statusClass = (status: OrderItem["status"]) => {
    if (status === "Delivered") {
      return "bg-emerald-100 text-emerald-700";
    }
    if (status === "Processing") {
      return "bg-amber-100 text-amber-700";
    }
    return "bg-blue-100 text-blue-700";
  };

  const paymentLabel = (paymentMethod: string) => {
    if (language === "hi") {
      if (paymentMethod === "upi") return "यूपीआई";
      if (paymentMethod === "card") return "कार्ड";
      if (paymentMethod === "cod") return "कैश ऑन डिलीवरी";
    }

    if (paymentMethod === "upi") return "UPI";
    if (paymentMethod === "card") return "Card";
    if (paymentMethod === "cod") return "Cash on Delivery";

    return paymentMethod;
  };

  const recentOrder = useMemo(() => orders[0] ?? null, [orders]);

  if (!user) return null;

  return (
    <div className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-lime-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl space-y-8">
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
                    {t.profile.badge}
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                    {user.name}
                  </h1>
                  <p className="mt-2 text-sm text-green-50/90">
                    {t.profile.welcome}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-2xl border border-white/30 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
              >
                {t.nav.logout}
              </button>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3 md:p-10">
            <div className="md:col-span-2">
              <div className="rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
                      {t.profile.personalDetails}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                      {t.profile.accountInformation}
                    </h2>
                  </div>

                  <button className="rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100">
                    {t.profile.editProfile}
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t.profile.fullName}
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {user.name}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t.profile.emailAddress}
                    </p>
                    <p className="mt-2 break-words text-base font-semibold text-gray-900">
                      {user.email}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t.profile.phoneNumber}
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {user.phone}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-green-50/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t.profile.address}
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
                  {t.profile.accountStatus}
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {t.profile.activeAccount}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {t.profile.accountStatusSub}
                </p>

                <div className="mt-5 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {t.profile.loggedIn}
                </div>
              </div>

              {recentOrder && (
                <div className="rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
                    {language === "hi" ? "हाल का ऑर्डर" : "Recent Order"}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {recentOrder.id}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(recentOrder.createdAt).toLocaleString()}
                  </p>
                  <div
                    className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                      recentOrder.status
                    )}`}
                  >
                    {statusLabel(recentOrder.status)}
                  </div>
                </div>
              )}

              <div className="rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
                  {t.profile.quickActions}
                </p>

                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => router.push("/")}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    {t.profile.goToHome}
                  </button>

                  <button
                    onClick={() => router.push("/cart")}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    {t.profile.viewCart}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    {t.profile.logoutFromAccount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
              {language === "hi" ? "ऑर्डर हिस्ट्री" : "Order History"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {language === "hi" ? "पुराने और हाल के ऑर्डर" : "Past & Recent Orders"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {language === "hi"
                ? "अपने हाल के और पुराने ऑर्डर यहां देखें।"
                : "Track your recent and previous purchases here."}
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-green-200 bg-green-50/60 p-10 text-center">
              <div className="text-5xl">📦</div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                {language === "hi" ? "अभी तक कोई ऑर्डर नहीं" : "No orders yet"}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {language === "hi"
                  ? "आपके पूरे किए गए ऑर्डर यहां दिखाई देंगे।"
                  : "Your completed orders will appear here."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="rounded-[28px] border border-gray-100 bg-white/90 p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          {index === 0
                            ? language === "hi"
                              ? "हाल का ऑर्डर"
                              : "Recent Order"
                            : language === "hi"
                            ? "पुराना ऑर्डर"
                            : "Past Order"}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                            order.status
                          )}`}
                        >
                          {statusLabel(order.status)}
                        </span>

                        <span className="text-sm font-semibold text-gray-900">
                          {order.id}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-gray-500">
                        {language === "hi" ? "कुल" : "Total"}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{order.total}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-green-50/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        {language === "hi" ? "डिलीवरी" : "Delivery"}
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-800">
                        {order.fullName}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {order.phone}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {order.address}, {order.city} - {order.pincode}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-green-50/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        {language === "hi" ? "पेमेंट और आइटम्स" : "Payment & Items"}
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-800">
                        {language === "hi" ? "पेमेंट:" : "Payment:"}{" "}
                        {paymentLabel(order.paymentMethod)}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {language === "hi" ? "आइटम्स:" : "Items:"} {order.items}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-600">
                      {language === "hi" ? "ऑर्डर किए गए प्रोडक्ट्स" : "Ordered Products"}
                    </p>

                    <div className="space-y-3">
                      {order.products.map((product) => (
                        <div
                          key={`${order.id}-${product.id}`}
                          className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name[language]}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.category[language]}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">
                              ₹{product.price} × {product.quantity}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">
                              ₹{product.price * product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}