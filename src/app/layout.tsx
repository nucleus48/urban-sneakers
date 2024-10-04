import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND_NAME, COOKIE } from "@/lib/constants";
import { Header } from "@/components/layouts/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import { CartProvider } from "@/components/providers/cart-provider";

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
  const cartPromise = cookies().then(({ get }) => {
    const cartId = get(COOKIE.CART_ID)?.value;
    return cartId ? getCart(cartId) : undefined;
  });

  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <TooltipProvider>
          <CartProvider cartPromise={cartPromise}>
            <Header />
            <main className="container py-4">{children}</main>
          </CartProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
