import { currencyFormatter } from "@/lib/utils";
import { ProductsQuery } from "@/types/storefront.generated";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  title,
  handle,
  priceRange,
  featuredImage,
}: ProductsQuery["products"]["nodes"][number]) {
  return (
    <div className="text-center space-y-2">
      <Link className="contents" href={`/products/${handle}`}>
        <Image
          src={featuredImage?.url}
          alt={`${title} preview`}
          className="w-full rounded-md brightness-95"
          width={300}
          height={300}
        />
      </Link>
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-primary">
        {currencyFormatter(
          priceRange.minVariantPrice.amount,
          priceRange.minVariantPrice.currencyCode,
        )}
      </div>
    </div>
  );
}
