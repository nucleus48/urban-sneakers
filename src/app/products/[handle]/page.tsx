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
import ProductCard from "@/components/product-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductDescription } from "@/components/product-description";

type Params = Promise<{ handle: string }>;

export default function ProductPage({ params }: { params: Params }) {
  return (
    <div>
      <div className="md:flex space-y-8 gap-8 items-start *:flex-1 mb-8">
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
      <Carousel orientation="horizontal">
        <CarouselMainContainer>
          {product.images.map((imageUrl) => (
            <SliderMainItem key={imageUrl}>
              <Image
                priority
                src={imageUrl}
                alt="carousel item"
                width={300}
                height={300}
                className="w-full brightness-95 rounded-md"
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>

        <CarouselThumbsContainer>
          {product.images.map((imageUrl, index) => (
            <SliderThumbItem index={index} key={imageUrl} className="h-auto">
              <Image
                src={imageUrl}
                alt="carousel item"
                width={200}
                height={200}
                className="w-full brightness-95 rounded-md"
              />
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
      </Carousel>
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl">{product.title}</h1>
          <div className="text-xl text-primary">
            {currencyFormatter(product.price, product.currencyCode)}
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
      <div className="space-y-4">
        <Skeleton className="w-full aspect-[1.2]" />
        <div className="flex gap-2 *:basis-1/3">
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-2/3 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-16 h-4" />
          <div className="flex gap-4">
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
        <Button className="w-full">Add To Cart</Button>
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
        <div className="flex w-max gap-4">
          {productRecommendations.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              handle={product.handle}
              imageUrl={product.imageUrl}
              price={product.price}
              currencyCode={product.currencyCode}
            />
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
