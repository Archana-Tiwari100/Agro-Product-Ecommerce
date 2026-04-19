"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
    }

    if (isLoggedIn && pathname === "/login") {
      router.push("/");
    }
  }, [isLoggedIn, pathname, router]);

  const isLoginPage = pathname === "/login";

  if (!isLoggedIn && !isLoginPage) {
    return null;
  }

  if (!isLoggedIn && isLoginPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}