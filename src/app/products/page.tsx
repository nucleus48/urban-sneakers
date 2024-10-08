import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
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
    <div className="container">
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
    <ProductCardSkeleton key={index} />
  ));
}
