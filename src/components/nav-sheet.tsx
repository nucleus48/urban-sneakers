import {
  BringToFrontIcon,
  HomeIcon,
  MenuIcon,
  PackageIcon,
  User2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ROUTE } from "@/lib/constants";
import Link from "next/link";
import { SearchBar } from "./search-bar";
import { cn } from "@/lib/utils";

export default function NavSheet({ className }: { className?: string }) {
  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className={cn(className, "md:hidden")}
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Menu</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent side="left" className="py-10">
        <SearchBar />
        <nav className="mt-4">
          <ul className="space-y-2">
            {NAV_LINKS.map((navLink) => (
              <li key={navLink.href}>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="w-full justify-start gap-2 text-lg"
                  asChild
                >
                  <Link href={navLink.href}>
                    <navLink.icon className="size-5" />
                    <span>{navLink.text}</span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

const NAV_LINKS = [
  { text: "Home", href: ROUTE.HOME, icon: HomeIcon },
  { text: "Account", href: ROUTE.ACCOUNT, icon: User2Icon },
  { text: "Products", href: ROUTE.PRODUCTS, icon: PackageIcon },
  { text: "Orders", href: ROUTE.ORDERS, icon: BringToFrontIcon },
];
