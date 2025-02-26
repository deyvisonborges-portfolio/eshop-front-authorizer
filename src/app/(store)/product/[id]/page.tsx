// import { productsService } from "@/modules/store/features/products/api/products.service";
// import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page";
// import { ProductDetailsSkeleton } from "@/modules/store/features/products/pages/details/skeleton";
// import { ProductUIModel } from "@/modules/store/features/products/product.ui-model";
// import { Suspense } from "react";

// type PageProps = {
//   params: Promise<{ id: string }>;
//   searchParams?: Promise<{ size?: string; color?: string }>;
// };

// async function getProduct(id: string): Promise<ProductUIModel> {
//   return await productsService.getProductById(id, {
//     cache: "force-cache",
//     next: { revalidate: 10 },
//   });
// }

// // Sempre isole chamadas assíncronas em um componente filho para permitir Suspense
// // um Server Component async espera todos os dados carregarem antes de renderizar, então o Skeleton nunca aparece.
// async function ProductDetails({ params, searchParams }: PageProps) {
//   const id = (await params).id;
//   const filters = searchParams ? await searchParams : {};

//   const product = await productsService.getProductByIdAndParams(id, filters);
//   return <ProductDetailsPage product={product} />;
// }

// // Um componente async em Next.js Server Components espera a resolução de todas as promessas antes de renderizar.
// // Isso significa que, se ProductDetailsAppPage fosse async, ele só renderizaria depois que productsService.getProductById resolvesse, impedindo o Suspense de exibir o fallback (Skeleton) enquanto os dados carregam.
// // ✔️ O Next.js renderiza imediatamente o Skeleton.
// // ✔️ Quando os dados chegam, ele substitui pelo conteúdo carregado.
// export default function ProductDetailsAppPage({
//   params,
//   searchParams,
// }: PageProps) {
//   return (
//     // ProductDetailsAppPage não é assíncrono, então ele renderiza imediatamente o <Suspense fallback={...}>.
//     <Suspense fallback={<ProductDetailsSkeleton />}>
//       {/* Depois, o ProductDetails é assíncrono e só ele espera a API. Isso faz com que o Skeleton apareça enquanto os dados carregam. */}
//       <ProductDetails params={params} searchParams={searchParams} />
//     </Suspense>
//   );
// }

import { productsService } from "@/modules/store/features/products/api/products.service";
import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page";
import { ProductDetailsSkeleton } from "@/modules/store/features/products/pages/details/skeleton";
import { ProductUIModel } from "@/modules/store/features/products/product.ui-model";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string): Promise<ProductUIModel> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await productsService.getProductById(id, {
    next: { revalidate: 4 },
  });
}

// Sempre isole chamadas assíncronas em um componente filho para permitir Suspense
// um Server Component async espera todos os dados carregarem antes de renderizar, então o Skeleton nunca aparece.
async function ProductDetails({ params }: PageProps) {
  const id = (await params).id;
  const product = await getProduct(id);
  return <ProductDetailsPage product={product} />;
}

// Um componente async em Next.js Server Components espera a resolução de todas as promessas antes de renderizar.
// Isso significa que, se ProductDetailsAppPage fosse async, ele só renderizaria depois que productsService.getProductById resolvesse, impedindo o Suspense de exibir o fallback (Skeleton) enquanto os dados carregam.
// ✔️ O Next.js renderiza imediatamente o Skeleton.
// ✔️ Quando os dados chegam, ele substitui pelo conteúdo carregado.
export default function ProductDetailsAppPage({ params }: PageProps) {
  return (
    // ProductDetailsAppPage não é assíncrono, então ele renderiza imediatamente o <Suspense fallback={...}>.
    <Suspense fallback={<ProductDetailsSkeleton />}>
      {/* Depois, o ProductDetails é assíncrono e só ele espera a API. Isso faz com que o Skeleton apareça enquanto os dados carregam. */}
      <ProductDetails params={params} />
    </Suspense>
  );
}
