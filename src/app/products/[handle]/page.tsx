import { getProduct } from "@/lib/shopify";
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

export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  return (
    <div>
      <div className="md:flex space-y-8 gap-8 items-start *:flex-1">
        <Suspense fallback={<ProductInfoSkeleton />}>
          <ProductInfo handle={params.handle} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductInfo({ handle }: { handle: string }) {
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
        </div>
        {product.options.map(({ name, values }) => (
          <div key={name} className="space-y-2">
            <div className="font-medium">{name}</div>
            <div className="flex gap-4">
              {values.map((value) => (
                <Button
                  key={value}
                  variant={"secondary"}
                  size="sm"
                  className="rounded-full w-max h-8"
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        ))}
        <hr />
        <p className="text-muted-foreground">{product.description}</p>
        <div className="flex flex-col space-y-2">
          <Button variant={"outline"}>ADD TO CART</Button>
          <Button>BUY IT NOW</Button>
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
        <div className="flex flex-col space-y-2">
          <Button variant={"outline"}>ADD TO CART</Button>
          <Button>BUY IT NOW</Button>
        </div>
      </div>
    </>
  );
}
