import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND_NAME } from "@/lib/constants";
import { Header } from "@/components/layouts/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/components/providers/cart-provider";
import { Toaster } from "@/components/ui/toaster";

const openSans = localFont({
  src: "./fonts/OpenSans.ttf",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <TooltipProvider>
          <CartProvider>
            <Header />
            <main className="container py-4">{children}</main>
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
