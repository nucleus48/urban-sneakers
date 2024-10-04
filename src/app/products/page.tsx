import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/lib/shopify";
import { Suspense } from "react";

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
  const products = await getProducts(10);

  return products.map((product) => (
    <ProductCard
      key={product.id}
      name={product.name}
      handle={product.handle}
      imageUrl={product.imageUrl}
      price={product.price}
      currencyCode={product.currencyCode}
    />
  ));
}

function ProductListSkeleton() {
  return [...new Array(10)].map((_, index) => (
    <div key={index} className="space-y-2">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-1/2 h-4 mx-auto" />
      <Skeleton className="w-20 h-4 mx-auto" />
    </div>
  ));
}
