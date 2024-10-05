import Image from "next/image";
import { CartLine as CartLineType, useCart } from "./providers/cart-provider";
import { currencyFormatter } from "@/lib/utils";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

export function CartLine({ merchandise, quantity }: CartLineType) {
  const {} = useCart();

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
          merchandise.price.amount,
          merchandise.price.currencyCode,
        )}
      </div>
      <div className="row-start-2 col-start-3 flex items-center bg-muted/50 rounded-full self-start">
        <Button variant={"ghost"} size={"icon"} className="size-8 rounded-full">
          <MinusIcon className="size-4" />
        </Button>
        <div className="font-medium">{quantity}</div>
        <Button variant={"ghost"} size={"icon"} className="size-8 rounded-full">
          <PlusIcon className="size-4" />
        </Button>
        <div className="flex items-center"></div>
      </div>
    </div>
  );
}
