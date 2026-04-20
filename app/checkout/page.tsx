"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/context/CartContext";
import { useLanguage } from "@/components/context/LanguageContext";
import { useAuth } from "@/components/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const validate = () => {
    const newErrors = {
      fullName: fullName.trim() ? "" : t.checkout.fullNameRequired,
      phone: /^[0-9]{10}$/.test(phone)
        ? ""
        : t.checkout.phoneInvalid,
      address: address.trim() ? "" : t.checkout.addressRequired,
      city: city.trim() ? "" : t.checkout.cityRequired,
      pincode: /^[0-9]{6}$/.test(pincode)
        ? ""
        : t.checkout.pincodeInvalid,
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === "");
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    if (!validate()) return;

    const statuses = ["Delivered", "Processing", "Packed"] as const;
    const randomStatus =
      statuses[Math.floor(Math.random() * statuses.length)];

    const orderData = {
      id: `AGRO-${Date.now()}`,
      fullName,
      phone,
      address,
      city,
      pincode,
      paymentMethod,
      total,
      items: totalItems,
      status: randomStatus,
      createdAt: new Date().toISOString(),
      products: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        category: item.product.category,
        unit: item.product.unit,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
    };

    localStorage.setItem("agro-last-order", JSON.stringify(orderData));

    const existingOrders = localStorage.getItem("agro-orders");
    const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];

    const updatedOrders = [orderData, ...parsedOrders];

    localStorage.setItem("agro-orders", JSON.stringify(updatedOrders));

    clearCart();
    router.push("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="rounded-[32px] border border-white/60 bg-white/75 p-10 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-green-50 text-4xl">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            {t.checkout.emptyTitle}
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            {t.checkout.emptySub}
          </p>

          <button
            onClick={() => router.push("/products")}
            className="mt-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
          >
            {t.checkout.browseProducts}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-lime-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-600">
            {t.checkout.badge}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {t.checkout.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
            {t.checkout.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t.checkout.deliveryDetails}
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t.checkout.fullName}
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder={t.checkout.fullNamePlaceholder}
                />
                {errors.fullName && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t.checkout.phone}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder={t.checkout.phonePlaceholder}
                />
                {errors.phone && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t.checkout.address}
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder={t.checkout.addressPlaceholder}
                />
                {errors.address && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t.checkout.city}
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder={t.checkout.cityPlaceholder}
                />
                {errors.city && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t.checkout.pincode}
                </label>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder={t.checkout.pincodePlaceholder}
                />
                {errors.pincode && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900">
                {t.checkout.paymentMethod}
              </h3>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${paymentMethod === "upi"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-200"
                    }`}
                >
                  <p className="font-semibold text-gray-900">
                    {t.checkout.upi}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {t.checkout.upiSub}
                  </p>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${paymentMethod === "card"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-200"
                    }`}
                >
                  <p className="font-semibold text-gray-900">
                    {t.checkout.card}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {t.checkout.cardSub}
                  </p>
                </button>

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${paymentMethod === "cod"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-200"
                    }`}
                >
                  <p className="font-semibold text-gray-900">
                    {t.checkout.cod}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {t.checkout.codSub}
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
              {t.checkout.orderSummary}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {t.checkout.summary}
            </h2>

            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="rounded-2xl bg-green-50/60 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.product.name[language]}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.category[language]}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        ₹{item.product.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="text-base font-bold text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between rounded-2xl bg-green-50/70 px-4 py-3 text-sm text-gray-700">
                <span>{t.checkout.totalItems}</span>
                <span className="font-semibold text-gray-900">
                  {totalItems}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-green-50/70 px-4 py-3 text-sm text-gray-700">
                <span>{t.checkout.delivery}</span>
                <span className="font-semibold text-emerald-700">
                  {t.checkout.free}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-700">
                    {t.checkout.totalPrice}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{total}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-7 w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
            >
              {t.checkout.placeOrder}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}