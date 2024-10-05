import Image from "next/image";
import { CartLine as CartLineType } from "./providers/cart-provider";
import { currencyFormatter } from "@/lib/utils";

export function CartLine({ merchandise, quantity }: CartLineType) {
  return (
    <div className="grid gap-2 items-end grid-cols-[auto_1fr_auto]">
      <Image
        src={merchandise.image?.url}
        alt={`${merchandise.title} preview`}
        width={100}
        height={100}
        className="row-span-2 col-start-1 rounded-md"
      />
      <div className="col-start-2 row-start-1 font-semibold truncate text-sm">
        {merchandise.product.title}
      </div>
      <div className="row-start-2 col-start-2 self-start">
        {merchandise.title}
      </div>
      <div className="col-start-3 row-start-1 text-primary text-sm">
        {currencyFormatter(
          merchandise.price.amount,
          merchandise.price.currencyCode,
        )}
      </div>
      <div className="row-start-2 col-start-3">{quantity}</div>
    </div>
  );
}
