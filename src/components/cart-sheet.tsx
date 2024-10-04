"use client";

import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useCart } from "./providers/cart-provider";

export function CartSheet() {
  const { isCartOpen, setIsCartOpen, optimisticCart } = useCart();
  console.log(optimisticCart)

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
          <div></div>
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
