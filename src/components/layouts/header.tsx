import { HeartIcon, MenuIcon, ShoppingBagIcon, User2Icon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { BRAND_NAME } from "@/lib/constants";
import { Logo } from "../ui/logo";

export function Header() {
  return (
    <header>
      <div className="container flex items-center gap-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Menu</p>
          </TooltipContent>
        </Tooltip>
        <div className="h-10 w-10 border rounded-md flex items-center justify-center ml-auto">
          <Logo />
        </div>
        <div className="text-xl font-semibold mr-auto">{BRAND_NAME}</div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <HeartIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Wishlist</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <User2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Account</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <ShoppingBagIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cart</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
