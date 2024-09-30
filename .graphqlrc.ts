import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset";
import "./src/lib/load-env";

export default {
  schema: "https://shopify.dev/storefront-graphql-direct-proxy",
  documents: ["*.ts", "!node_modules"],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: process.env.SHOPIFY_API_VERSION,
      outputDir: "./src/types",
      declarations: false,
    }),
  },
};
