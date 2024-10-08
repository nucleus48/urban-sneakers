"use client";

import { ShoppingBagIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { CartQuery } from "@/types/storefront.generated";
import Image from "next/image";
import { CartLine as CartLineType, useCart } from "./providers/cart-provider";
import { currencyFormatter } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { removeCartLine, updateCartLine } from "@/lib/actions";
import { toast } from "../hooks/use-toast";
import { VisuallyHidden } from "./ui/visually-hidden";
import Link from "next/link";

export function CartSheet({ cart }: { cart: CartQuery["cart"] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { optimisticCart, setCart } = useCart();

  useEffect(() => setCart(cart), [cart, setCart]);

  useEffect(() => {
    if (!optimisticCart) return;

    const isCartOpenAttribute = optimisticCart.attributes.some(
      (value) => value.key == "isCartOpen",
    );

    if (isCartOpenAttribute) setIsOpen(true);
  }, [optimisticCart]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <ShoppingBagIcon />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cart</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent className="w-full px-4 pb-4">
        <VisuallyHidden>
          <SheetTitle>Cart</SheetTitle>
        </VisuallyHidden>
        {!!optimisticCart?.lines.nodes.length ? (
          <div className="grid grid-rows-[1fr_auto] h-full">
            <ScrollArea className="pt-2">
              <div className="mt-4 space-y-2">
                {optimisticCart.lines.nodes.map((line) => (
                  <CartLine key={line.id} {...line} />
                ))}
              </div>
            </ScrollArea>
            <CartSummary />
          </div>
        ) : (
          <div className="size-full flex flex-col items-center justify-center gap-2">
            <ShoppingCartIcon className="size-24" />
            <p className="font-semibold text-lg">Cart is empty</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartLine({ id, merchandise, cost, quantity }: CartLineType) {
  const {
    incrementOptimisticCartLine,
    decrementOptimisticCartLine,
    removeOptimisticCartLine,
  } = useCart();

  return (
    <div className="relative flex gap-2 items-center p-3">
      <Image
        src={merchandise.image?.url}
        alt={`${merchandise.title} preview`}
        width={80}
        height={80}
        className="rounded-md brightness-95"
      />
      <div className="text-sm">
        <div className="font-medium line-clamp-2">{merchandise.product.title}</div>
        <div className="text-muted-foreground">{merchandise.title}</div>
      </div>
      <div className="ml-auto">
        <div className="text-primary text-sm mb-2">
          {currencyFormatter(
            cost.totalAmount.amount,
            cost.totalAmount.currencyCode,
          )}
        </div>
        <form className="flex items-center gap-1 bg-secondary rounded-full p-1">
          <Button
            formAction={() => {
              removeOptimisticCartLine(merchandise.id);
              removeCartLine(id);
            }}
            variant={"secondary"}
            size={"icon"}
            className="size-6 rounded-full absolute top-0 left-0"
          >
            <XIcon className="size-4" />
          </Button>
          <Button
            formAction={() => {
              decrementOptimisticCartLine(merchandise.id);
              updateCartLine(id, quantity - 1);
            }}
            variant={"ghost"}
            size={"icon"}
            className="size-6 rounded-l-full"
          >
            <MinusIcon className="size-4" />
          </Button>
          <div>{quantity}</div>
          <Button
            formAction={() => {
              if (merchandise.quantityAvailable === quantity) {
                toast({
                  description: `Product variant has only ${merchandise.quantityAvailable} pairs`,
                });
                return;
              }
              incrementOptimisticCartLine(merchandise.id);
              updateCartLine(id, quantity + 1);
            }}
            variant={"ghost"}
            size={"icon"}
            className="size-6 rounded-r-full"
          >
            <PlusIcon className="size-4" />
          </Button>
          <div className="flex items-center"></div>
        </form>
      </div>
    </div>
  );
}

function CartSummary() {
  const { optimisticCart } = useCart();
  return (
    <section className="p-3">
      <article className="*:flex *:justify-between *:py-1 divide-y divide-y-border mb-2">
        <div>
          <div>Estimated tax</div>
          <div>
            {optimisticCart?.cost.totalTaxAmount
              ? currencyFormatter(
                  optimisticCart.cost.totalTaxAmount.amount,
                  optimisticCart.cost.totalTaxAmount.currencyCode,
                )
              : "Calculating..."}
          </div>
        </div>
        <div>
          <div>Subtotal</div>
          <div>
            {optimisticCart &&
              currencyFormatter(
                optimisticCart.cost.subtotalAmount.amount,
                optimisticCart.cost.subtotalAmount.currencyCode,
              )}
          </div>
        </div>
        <div>
          <div>Total</div>
          <div>
            {optimisticCart &&
              currencyFormatter(
                optimisticCart.cost.totalAmount.amount,
                optimisticCart.cost.totalAmount.currencyCode,
              )}
          </div>
        </div>
      </article>
      <Button className="w-full" asChild>
        <Link href={optimisticCart?.checkoutUrl}>Checkout</Link>
      </Button>
    </section>
  );
}
