import "./globals.css";
import { CartProvider } from "@/components/context/CartContext";
import { AuthProvider } from "@/components/context/AuthContext";
import { LanguageProvider } from "@/components/context/LanguageContext";
import AppShell from "@/components/layout/AppShell";

export const metadata = {
  title: "Agro - Fresh Organic Store",
  description: "Fresh and organic agro products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen">
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <AppShell>{children}</AppShell>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}