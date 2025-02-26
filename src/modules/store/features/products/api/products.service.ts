import { FetchClient } from "@/integrations/fetch-client";

const apiClient = new FetchClient(process.env.NEXT_PUBLIC_API_URL, "");

export const productsService = {
  getAllProducts: async (config?: RequestInit) => {
    return apiClient.get<any>("/products", {}, { ...config });
  },
  getProductById: async (id: string, config?: RequestInit) => {
    const { data } = await apiClient.get<any>("/products", { id }, config);
    return data;
  },
  getProductByIdAndParams: async (
    productId: string,
    params?: Partial<{ size: string; color: string }>,
    config?: RequestInit
  ) => {
    const { data } = await apiClient.get<any>(
      `/products`,
      { ...params, id: productId },
      config
    );
    return data;
  },
};
