"use client";

import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { CartQuery } from "@/types/storefront.generated";
import Image from "next/image";
import { CartLine as CartLineType, useCart } from "./providers/cart-provider";
import { currencyFormatter } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { updateCartLine } from "@/lib/actions";
import { toast } from "../hooks/use-toast";

export function CartSheet({ cart }: { cart: CartQuery["cart"] }) {
  const { isCartOpen, optimisticCart, setCart, setIsCartOpen } = useCart();

  useEffect(() => setCart(cart), [cart, setCart]);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
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
      <SheetContent className="w-full">
        {optimisticCart ? (
          <ScrollArea className="h-full">
            <div className="space-y-4 mt-4">
              {optimisticCart.lines.nodes.map((line) => (
                <CartLine key={line.id} {...line} />
              ))}
            </div>
          </ScrollArea>
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
    <div className="grid gap-2 items-end grid-cols-[auto_1fr_auto]">
      <Image
        src={merchandise.image?.url}
        alt={`${merchandise.title} preview`}
        width={100}
        height={100}
        className="row-span-2 col-start-1 rounded-md brightness-95"
      />
      <div className="col-start-2 row-start-1 font-semibold truncate text-sm">
        {merchandise.product.title}
      </div>
      <div className="row-start-2 col-start-2 self-start">
        {merchandise.title}
      </div>
      <div className="col-start-3 row-start-1 text-primary">
        {currencyFormatter(
          cost.totalAmount.amount,
          cost.totalAmount.currencyCode,
        )}
      </div>
      <form className="row-start-2 col-start-3 flex items-center bg-muted/50 rounded-full self-start">
        <Button
          formAction={() => {
            decrementOptimisticCartLine(merchandise.id);
            updateCartLine(id, quantity - 1);
          }}
          variant={"ghost"}
          size={"icon"}
          className="size-8 rounded-full"
        >
          <MinusIcon className="size-4" />
        </Button>
        <div className="font-medium">{quantity}</div>
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
          className="size-8 rounded-full"
        >
          <PlusIcon className="size-4" />
        </Button>
        <div className="flex items-center"></div>
      </form>
    </div>
  );
}
