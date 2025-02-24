import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page";
import { use } from "react";

export type ProductDetailsAppPageRouteProps = {
  params: Promise<{ id?: string | undefined }>;
  searchParams: Promise<{
    color?: string | undefined;
    size?: string | undefined;
  }>;
};

export default async function ProductDetailsAppPage({
  params,
  searchParams,
}: ProductDetailsAppPageRouteProps) {
  return <ProductDetailsPage params={params} searchParams={searchParams} />;
}
