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

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
    }

    if (isLoggedIn && pathname === "/login") {
      router.push("/");
    }
  }, [isHydrated, isLoggedIn, pathname, router]);

  if (!isHydrated) {
    return null;
  }

  const isLoginPage = pathname === "/login";

  if (!isLoggedIn && isLoginPage) {
    return <main>{children}</main>;
  }

  if (!isLoggedIn && !isLoginPage) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}