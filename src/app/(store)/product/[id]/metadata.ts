import { productsService } from "@/modules/store/features/products/api/products.service";
import { Metadata } from "next";

export default async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await productsService.getProductById(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.images.map((p: any) => ({
        url: p,
        width: 200,
        height: 200,
        alt: product.description,
      })),
    },
  };
}
