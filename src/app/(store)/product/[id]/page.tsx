import { use } from "react";
import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page";

export type ProductDetailsAppPageRouteProps = {
  params: Promise<{ id?: string }>;
};

export default function ProductDetailsAppPage({
  params,
}: ProductDetailsAppPageRouteProps) {
  const resolvedParams = use(params);
  return <ProductDetailsPage params={resolvedParams} />;
}
