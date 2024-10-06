import * as VisuallyHiddenRadix from "@radix-ui/react-visually-hidden";

export function VisuallyHidden({ children }: React.PropsWithChildren) {
  return <VisuallyHiddenRadix.Root>{children}</VisuallyHiddenRadix.Root>;
}
