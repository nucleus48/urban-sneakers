import { ShoppingBagIcon, User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { BRAND_NAME, COOKIE, ROUTE } from "@/lib/constants";
import { Logo } from "../ui/icons";
import { SearchBar } from "../search-bar";
import { CartSheet } from "../cart-sheet";
import { NavSheet } from "../nav-sheet";
import Link from "next/link";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import { Suspense } from "react";

export function Header() {
  const menuLinks = [
    { text: "Home", href: ROUTE.HOME },
    { text: "Products", href: ROUTE.PRODUCTS },
    { text: "Orders", href: ROUTE.ORDERS },
  ];

  return (
    <header>
      <div className="container flex items-center gap-2 lg:gap-4 py-4 [&_svg]:size-5">
        <div className="flex size-10 border rounded-md items-center justify-center">
          <Logo />
        </div>
        <div className="font-semibold text-lg mr-auto md:mr-0 lg:mr-auto">
          {BRAND_NAME}
        </div>
        <nav className="mr-auto">
          <ul className="md:flex hidden gap-2 lg:gap-4 text-sm font-medium">
            {menuLinks.map((menuLink) => (
              <li key={menuLink.href} className="text-muted-foreground">
                <Link prefetch href={menuLink.href}>
                  {menuLink.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SearchBar className="hidden md:block" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className="hidden md:flex"
            >
              <User2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Account</p>
          </TooltipContent>
        </Tooltip>
        <Suspense fallback={<CartSkeleton />}>
          <Cart />
        </Suspense>
        <NavSheet className="md:hidden" />
      </div>
    </header>
  );
}

async function Cart() {
  const cartId = (await cookies()).get(COOKIE.CART_ID)?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  return <CartSheet cart={cart} />;
}

function CartSkeleton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <ShoppingBagIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Cart</p>
      </TooltipContent>
    </Tooltip>
  );
}
