"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/components/context/AuthContext";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isHydrated } = useAuth();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn && !isAuthPage) {
      router.push("/login");
    }

    if (isLoggedIn && isAuthPage) {
      router.push("/");
    }
  }, [isHydrated, isLoggedIn, isAuthPage, router]);

  if (!isHydrated) {
    return null;
  }

  if (!isLoggedIn && isAuthPage) {
    return <main>{children}</main>;
  }

  if (!isLoggedIn && !isAuthPage) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  );
}