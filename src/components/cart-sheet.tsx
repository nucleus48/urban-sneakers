"use client";

import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useCart } from "./providers/cart-provider";
import { useEffect, useRef, useState } from "react";
import { CartLine } from "./cart-line";
import { ScrollArea } from "./ui/scroll-area";

export function CartSheet() {
  const { optimisticCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setIsCartOpen(true);
  }, [optimisticCart]);

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
