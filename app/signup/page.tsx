"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/context/AuthContext";

export default function SignupPage() {
    const router = useRouter();
    const { signup } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (error) setError("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.password.trim() ||
            !form.phone.trim() ||
            !form.address.trim()
        ) {
            setError("All fields are required");
            return;
        }

        const result = signup(form);

        if (!result.success) {
            setError(result.message);
            return;
        }

        router.push("/");
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f6fff8_0%,#ecfdf3_45%,#f0fdf4_100%)] px-6 py-12">
            <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-green-200/40 blur-3xl" />
            <div className="absolute top-1/3 -right-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-lime-200/40 blur-3xl" />

            <div className="relative w-full max-w-2xl rounded-[28px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_80px_rgba(22,101,52,0.12)] backdrop-blur-2xl">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-3xl shadow-lg">
                        🌿
                    </div>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
                        Create account
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Sign up for Agro
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Create your account to save your details and speed up checkout.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Enter your address"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    {error && (
                        <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="md:col-span-2 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-green-700 hover:underline">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}