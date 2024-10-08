"use client";

import { CircleXIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Form from "next/form"
import { SEARCH_PARAM_KEY } from "@/lib/constants";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");

  return (
    <Form className={cn(className, "relative")} action={"/products"}>
      <SearchIcon className="absolute size-5 left-2.5 bottom-2.5" />
      <Input
        name={SEARCH_PARAM_KEY.SEARCH}
        placeholder="Search for products..."
        className="px-10"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      {query && (
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="absolute bottom-0 right-0"
          onClick={() => setQuery("")}
        >
          <CircleXIcon className="size-5" />
        </Button>
      )}
    </Form>
  );
}
