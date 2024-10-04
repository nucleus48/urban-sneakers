"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductOption, SelectedOption } from "@/types/storefront.types";
import { Fragment, useMemo, useState } from "react";
import { useCart } from "./providers/cart-provider";
import { ProductQuery } from "@/types/storefront.generated";

export function ProductDescription({
  options,
  variants,
  description,
}: Pick<
  NonNullable<ProductQuery["product"]>,
  "options" | "variants" | "description"
>) {
  const { setIsCartOpen } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<
    Pick<SelectedOption, "name" | "value">[]
  >([]);

  const availableOptions = useMemo(() => {
    const fileterdVaraints = variants.nodes.filter(
      (variant) =>
        variant.availableForSale &&
        selectedOptions.every((option) =>
          variant.selectedOptions.some(
            (data) => data.name == option.name && data.value == option.value,
          ),
        ),
    );

    const availableOptions = fileterdVaraints.reduce(
      (accumulation, variant) => {
        variant.selectedOptions.forEach((option) => {
          const data = accumulation[option.name];
          accumulation[option.name] = {
            name: option.name,
            values: [...(data ? data.values : []), option.value],
          };
        });
        return accumulation;
      },
      {} as Record<string, Pick<ProductOption, "name" | "values">>,
    );

    return Object.values(availableOptions);
  }, [selectedOptions, variants]);

  const toggleOption = (name: string, value: string) =>
    setSelectedOptions((options) => {
      const option = options.some(
        (option) => option.name == name && option.value == value,
      );

      if (option)
        return options.filter(
          (option) => option.name != name && option.value != value,
        );
      return [...options, { name, value }];
    });

  return (
    <form className="space-y-4" action={() => setIsCartOpen(true)}>
      {options.map(({ name, values }) => (
        <div key={name} className="space-y-2">
          <div className="font-medium">{name}</div>
          <div className="flex gap-4 flex-wrap">
            {values.map((value) => {
              const isAvailable = availableOptions.some(
                (option) =>
                  option.name == name && option.values.includes(value),
              );
              const isSelected = selectedOptions.some(
                (option) => option.name == name && option.value == value,
              );

              return (
                <Fragment key={value}>
                  <Checkbox
                    id={value}
                    name={name}
                    value={value}
                    className="hidden"
                    onClick={() => toggleOption(name, value)}
                    disabled={!isAvailable}
                  />
                  <Label
                    htmlFor={value}
                    className={`bg-muted px-3 border border-white/0 py-2 rounded-full cursor-pointer ${!isAvailable && "opacity-75 cursor-not-allowed"} ${isSelected && "border border-primary"}`}
                  >
                    {value}
                  </Label>
                </Fragment>
              );
            })}
          </div>
        </div>
      ))}
      <hr />
      <p className="text-muted-foreground">{description}</p>
      <Button
        className="w-full"
        disabled={selectedOptions.length !== options.length}
      >
        Add To Cart
      </Button>
    </form>
  );
}
