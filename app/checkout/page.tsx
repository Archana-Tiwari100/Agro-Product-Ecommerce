"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/context/CartContext";
import { useLanguage } from "@/components/context/LanguageContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { language } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  const validate = () => {
    const newErrors = {
      fullName: fullName.trim() ? "" : "Full name is required",
      phone: /^[0-9]{10}$/.test(phone) ? "" : "Enter valid 10-digit phone number",
      address: address.trim() ? "" : "Address is required",
      city: city.trim() ? "" : "City is required",
      pincode: /^[0-9]{6}$/.test(pincode) ? "" : "Enter valid 6-digit pincode",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === "");
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    if (!validate()) return;

    const orderData = {
      fullName,
      phone,
      address,
      city,
      pincode,
      paymentMethod,
      total,
      items: cart.length,
    };

    localStorage.setItem("agro-last-order", JSON.stringify(orderData));

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
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Add products to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
          >
            Browse Products
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
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Complete Your Order
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
            Enter your delivery details and choose a payment method.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder="Enter delivery address"
                />
                {errors.address && (
                  <p className="mt-2 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="mt-2 text-xs text-red-500">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  placeholder="Enter pincode"
                />
                {errors.pincode && (
                  <p className="mt-2 text-xs text-red-500">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-200"
                  }`}
                >
                  <p className="font-semibold text-gray-900">UPI</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Google Pay, PhonePe, Paytm
                  </p>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-200"
                  }`}
                >
                  <p className="font-semibold text-gray-900">Card</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Credit / Debit Card
                  </p>
                </button>

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-200"
                  }`}
                >
                  <p className="font-semibold text-gray-900">Cash on Delivery</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Pay at your doorstep
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-600">
              Order Summary
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">Summary</h2>

            <div className="mt-6 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-green-50/60 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name[language]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.category[language]}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">₹{item.price}</p>
                </div>
              ))}

              <div className="flex items-center justify-between rounded-2xl bg-green-50/70 px-4 py-3 text-sm text-gray-700">
                <span>Total Items</span>
                <span className="font-semibold text-gray-900">{cart.length}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-green-50/70 px-4 py-3 text-sm text-gray-700">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-700">Free</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-700">
                    Total Price
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
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}