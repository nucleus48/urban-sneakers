import { currencyFormatter } from "@/lib/utils";
import { ProductsQuery } from "@/types/storefront.generated";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export function ProductCard({
  title,
  handle,
  priceRange,
  featuredImage,
}: ProductsQuery["products"]["nodes"][number]) {
  return (
    <div className="text-center space-y-2">
      <Link prefetch className="contents" href={`/products/${handle}`}>
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

export function ProductCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-1/2 h-4 mx-auto" />
      <Skeleton className="w-20 h-4 mx-auto" />
    </div>
  );
}
