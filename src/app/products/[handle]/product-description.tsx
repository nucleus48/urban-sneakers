"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ProductOption,
  ProductVariant,
  SelectedOption,
} from "@/types/storefront.types";
import Form from "next/form";
import { useMemo, useState } from "react";

export function ProductDescription({
  options,
  variants,
  description,
}: {
  description: string;
  variants: Pick<
    ProductVariant,
    "id" | "availableForSale" | "selectedOptions"
  >[];
  options: Pick<ProductOption, "name" | "values">[];
}) {
  const [selectedOptions, setSelectedOptions] = useState<
    Pick<SelectedOption, "name" | "value">[]
  >([]);

  const availableOptions = useMemo(() => {
    const fileterdVaraints = variants.filter(
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
    <Form className="space-y-4" action={() => {}}>
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
                <>
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
                </>
              );
            })}
          </div>
        </div>
      ))}
      <hr />
      <p className="text-muted-foreground">{description}</p>
      <Button className="w-full">Add To Cart</Button>
    </Form>
  );
}
