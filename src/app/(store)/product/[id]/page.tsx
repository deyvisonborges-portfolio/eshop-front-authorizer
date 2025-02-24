import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page";
import { ProductUIModel } from "@/modules/store/features/products/product.ui-model";
import { Metadata } from "next";

async function getProduct(id: string): Promise<ProductUIModel> {
  const apiUrl = process.env.API_URL || "http://localhost:3000/api"; // Fallback para ambiente local
  const res = await fetch(`${apiUrl}/products?id=${id}`, {
    cache: "force-cache",
  });
  return (await res.json()).data;
}

export type ProductDetailsAppPageRouteProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailsAppPageRouteProps): Promise<Metadata> {
  const id = (await params).id;
  const product = await getProduct(id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.images.map((p) => ({
        url: p,
        width: 200,
        height: 200,
        alt: product.description,
      })),
    },
  };
}

export default async function ProductDetailsAppPage({
  params,
}: ProductDetailsAppPageRouteProps) {
  const id = (await params).id;

  const product: ProductUIModel = await getProduct(id);

  return <ProductDetailsPage product={product} />;
}
