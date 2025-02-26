import { productsService } from "@/modules/store/features/products/api/products.service";
import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page";
import { ProductDetailsSkeleton } from "@/modules/store/features/products/pages/details/skeleton";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ size?: string; color?: string }>;
};

// O generateMetadata bloqueia toda a renderizacao
// https://github.com/vercel/next.js/discussions/62888
// export async function generateMetadata({
//   params,
//   searchParams,
// }: PageProps): Promise<Metadata> {
//   const id = (await params).id;
//   const filters = searchParams ? await searchParams : {};
//   const [product] = await Promise.all([
//     productsService.getProductByIdAndParams(id, filters),
//   ]);

//   return {
//     title: product.name,
//     description: product.description,
//     openGraph: {
//       images: product.images.map((p: any) => ({
//         url: p,
//         width: 200,
//         height: 200,
//         alt: product.description,
//       })),
//     },
//   };
// }

async function ProductDetails({ params, searchParams }: PageProps) {
  const id = (await params).id;
  const filters = searchParams ? await searchParams : {};

  const product = await productsService.getProductByIdAndParams(id, filters);
  return <ProductDetailsPage product={product} />;
}

//  Essa função não é async, pois não faz nenhuma operação assíncrona diretamente.
// Ela não faz fetch de dados diretamente.
// O Next.js não precisa esperar nada antes de começar a renderizar.
// O <Suspense> gerencia o carregamento assíncrono de ProductDetails.

// Se ProductDetailsAppPage fosse async, o Next.js só começaria a renderizar a página inteira depois de buscar os dados, o que quebraria o efeito de streaming do Suspense. 🚀
// Isso seria o caso do generateMetadata, que trava a renderização
export default function ProductDetailsAppPage({
  params,
  searchParams,
}: PageProps) {
  return (
    // O Suspense permite que o Next.js carregue partes da página enquanto espera os dados, exibindo ProductDetailsSkeleton no lugar.
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails params={params} searchParams={searchParams} />
    </Suspense>
  );
}
