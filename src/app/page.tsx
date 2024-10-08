import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="grid *:row-start-1 *:col-start-1 place-items-center">
      <Image
        className="w-full"
        src="/images/hero-1.webp"
        alt="mobile hero image"
        width={500}
        height={500}
      />
      <div className="text-center text-balance space-y-4">
        <p className="text-xs font-medium flex gap-2 items-center justify-center">
          <hr className="border border-black w-8" /> <span>OUTFIT WITH SNEAKER</span>
        </p>
        <h1 className="font-bold text-4xl tracking-tighter leading-tight">
          Bring Your Shoes Back To Life
        </h1>
        <Button className="rounded-full">SEE MORE</Button>
      </div>
    </div>
  );
}
