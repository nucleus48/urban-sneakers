import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { BRAND_NAME } from "@/lib/constants";
import { Logo } from "../ui/logo";
import { SearchBar } from "../search-bar";
import { CartSheet } from "../cart-sheet";
import { NavSheet } from "../nav-sheet";

export function Header() {
  return (
    <header className="bg-wh">
      <div className="container flex items-center gap-2 py-4 [&_svg]:size-5">
        <NavSheet className="mr-auto md:hidden" />
        <div className="flex size-10 border rounded-md items-center justify-center">
          <Logo />
        </div>
        <div className="font-semibold text-lg mr-auto">{BRAND_NAME}</div>
        <SearchBar className="hidden md:block" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className="hidden md:flex"
            >
              <User2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Account</p>
          </TooltipContent>
        </Tooltip>
        <CartSheet />
      </div>
    </header>
  );
}
