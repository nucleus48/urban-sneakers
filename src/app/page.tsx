import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import { getCollections, getProducts } from "@/lib/shopify";
import Link from "next/link";
import { SEARCH_PARAM_KEY } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CollectionsCarousel />
      <FeaturedProducts />
    </>
  );
}

function HeroSection() {
  return (
    <div className="grid *:row-start-1 *:col-start-1 place-items-center mb-8">
      <Image
        className="w-full"
        src="/images/hero-1.webp"
        alt="mobile hero image"
        width={500}
        height={500}
      />
      <div className="text-center text-balance space-y-4">
        <div className="text-xs font-medium flex gap-2 items-center justify-center">
          <hr className="border border-black w-8" /> <p>OUTFIT WITH SNEAKER</p>
        </div>
        <h1 className="font-bold text-4xl tracking-tighter leading-tight">
          Bring Your Shoes Back To Life
        </h1>
        <Button className="rounded-full">SEE MORE</Button>
      </div>
    </div>
  );
}

async function CollectionsCarousel() {
  const collections = await getCollections(5);

  return (
    <section className="container overflow-x-hidden mb-16">
      <Carousel>
        <CarouselMainContainer className="gap-4 rounded-md">
          {collections.nodes.map((collection, index) => (
            <SliderMainItem key={index} className="brightness-95 p-4">
              <Link
                className="contents"
                href={{
                  pathname: "/products",
                  query: { [SEARCH_PARAM_KEY.COLLECTION]: collection.handle },
                }}
              >
                <Image
                  className="size-full object-contain rounded-md"
                  src={collection.image?.url}
                  alt={`${collection.title} preview`}
                  width={300}
                  height={300}
                />
              </Link>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <CarouselThumbsContainer className="gap-x-2 justify-center mt-4">
          {collections.nodes.map((_, index) => (
            <CarouselIndicator key={index} index={index} className="size-2" />
          ))}
        </CarouselThumbsContainer>
      </Carousel>
    </section>
  );
}

async function FeaturedProducts() {
  const products = await getProducts(6);

  return (
    <section className="container">
      <div className="grid grid-cols-1 gap-4">
        {products.nodes.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="text-center mt-4">
        <Button variant={"outline"} className="rounded-full" asChild>
          <Link href="/products">ALL PRODUCTS</Link>
        </Button>
      </div>
    </section>
  );
}
