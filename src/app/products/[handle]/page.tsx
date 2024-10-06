import { getProduct, getProductRecommendations } from "@/lib/shopify";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/ui/carousel";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { currencyFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductDescription } from "@/components/product-description";
import { ProductCard } from "@/components/product-card";

type Params = Promise<{ handle: string }>;

export default function ProductPage({ params }: { params: Params }) {
  return (
    <div>
      <div className="md:flex space-y-8 gap-8 items-start mb-8 *:flex-1">
        <Suspense fallback={<ProductInfoSkeleton />}>
          <ProductInfo params={params} />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<ProductRecommendationsSkeleton />}>
          <ProductRecommendations params={params} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductInfo({ params }: { params: Params }) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  return (
    <>
      <Carousel orientation="horizontal" className="md:max-w-md mx-auto">
        <CarouselMainContainer>
          {product.images.nodes.map((image) => (
            <SliderMainItem key={image.id}>
              <Image
                priority
                src={image.url}
                alt="carousel item"
                width={image.width || 300}
                height={image.height || 300}
                className="w-full rounded-md"
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>

        <CarouselThumbsContainer>
          {product.images.nodes.map((image, index) => (
            <SliderThumbItem index={index} key={image.id} className="h-auto">
              <Image
                src={image.url}
                alt="carousel item"
                width={image.width || 200}
                height={image.height || 200}
                className="w-full rounded-md"
              />
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
      </Carousel>
      <section className="space-y-4 md:max-w-md">
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl">{product.title}</h1>
          <div className="text-xl text-primary">
            {currencyFormatter(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode,
            )}
          </div>
          <ProductDescription
            options={product.options}
            description={product.description}
            variants={product.variants}
          />
        </div>
      </section>
    </>
  );
}

function ProductInfoSkeleton() {
  return (
    <>
      <div className="space-y-4 md:max-w-md mx-auto">
        <Skeleton className="w-full aspect-[1.2]" />
        <div className="flex gap-2 *:basis-1/3">
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
        </div>
      </div>
      <div className="space-y-4 md:max-w-md">
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/3 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-16 h-4" />
          <div className="flex gap-4">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
        <hr />
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
        <Button className="w-full" disabled>
          Add To Cart
        </Button>
      </div>
    </>
  );
}

async function ProductRecommendations({ params }: { params: Params }) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  const productRecommendations = await getProductRecommendations(product.id);

  if (!productRecommendations) return null;

  return (
    <section>
      <h2 className="font-semibold text-xl mb-4">Recommendations</h2>
      <ScrollArea>
        <div className="flex w-max gap-4 *:w-[300px]">
          {productRecommendations.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

function ProductRecommendationsSkeleton() {
  return (
    <section>
      <h2 className="font-semibold text-xl mb-4">Recommendations</h2>
      <div>
        <ScrollArea>
          <div className="flex w-max gap-4">
            {[...new Array(5)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="w-[300px] h-[300px]" />
                <Skeleton className="w-2/3 h-4 mx-auto" />
                <Skeleton className="w-20 h-4 mx-auto" />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
