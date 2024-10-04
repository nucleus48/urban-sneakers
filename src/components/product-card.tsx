import { currencyFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type ProductCardProps = {
  handle: string;
  imageUrl: string;
  name: string;
  price: number;
  currencyCode: string;
};

export function ProductCard({
  handle,
  imageUrl,
  name,
  price,
  currencyCode,
}: ProductCardProps) {
  return (
    <div className="text-center space-y-2">
      <Link className="contents" href={`/products/${handle}`}>
        <Image
          src={imageUrl}
          alt={`${name} preview`}
          className="w-full rounded-md brightness-95"
          width={300}
          height={300}
        />
      </Link>
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-primary">
        {currencyFormatter(price, currencyCode)}
      </div>
    </div>
  );
}
