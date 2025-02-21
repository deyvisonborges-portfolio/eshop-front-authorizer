import { ProductDetailsPage } from "@/modules/store/features/products/pages/details.page";

type RouteProps = {
  params: {
    id: string;
    slug: string;
  };
};

export default function ProductPage({ params }: RouteProps) {
  return <ProductDetailsPage />;
}
