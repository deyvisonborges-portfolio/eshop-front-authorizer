import { createAPI } from "@/integrations/axios-client";

export const productAPIClient = createAPI({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/products`,
});
