import { BRAND_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      <div className="container text-muted-foreground [&_span]:text-foreground [&_span]:font-medium text-sm pb-4 mt-8 space-y-8">
        <hr />
        <p>
          &copy; <span>Copyright {new Date().getFullYear()}</span> |{" "}
          {BRAND_NAME}. <span>Powered by Shopify.</span>
        </p>
      </div>
    </footer>
  );
}
