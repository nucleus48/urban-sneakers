import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCTS_PAGE_LENGTH } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductList() {
  const products = await getProducts(PRODUCTS_PAGE_LENGTH);

  return products.nodes.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

function ProductListSkeleton() {
  return [...new Array(PRODUCTS_PAGE_LENGTH)].map((_, index) => (
    <div key={index} className="space-y-2">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-1/2 h-4 mx-auto" />
      <Skeleton className="w-20 h-4 mx-auto" />
    </div>
  ));
}
