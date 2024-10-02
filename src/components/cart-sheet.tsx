"use client";

import { ShoppingBagIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useCart } from "./providers/cart-provider";

export function CartSheet() {
  const { isCartOpen, setIsCartOpen } = useCart();

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
      <SheetContent></SheetContent>
    </Sheet>
  );
}
