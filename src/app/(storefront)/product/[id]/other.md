import { productsService } from "@/modules/store/features/products/api/products.service";
import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page";
import { ProductDetailsSkeleton } from "@/modules/store/features/products/pages/details/skeleton";
import { ProductUIModel } from "@/modules/store/features/products/product.ui-model";
import { Suspense } from "react";

type PageProps = {
params: { id: string };
};

async function getProduct(id: string): Promise<ProductUIModel> {
return await productsService.getProductById(id, {
cache: "force-cache",
});
}

// async function generateStaticParams() {
// const products = await productsService.getAllProducts(); // Pegue uma lista de IDs
// return products.map((product) => ({ id: product.id }));
// }

// Sempre isole chamadas assíncronas em um componente filho para permitir Suspense
// um Server Component async espera todos os dados carregarem antes de renderizar, então o Skeleton nunca aparece.
async function ProductDetails({ params }: PageProps) {
const id = params.id;
const product = await getProduct(id);
return <ProductDetailsPage product={product} />;
}

// Um componente async em Next.js Server Components espera a resolução de todas as promessas antes de renderizar.
// Isso significa que, se ProductDetailsAppPage fosse async, ele só renderizaria depois que productsService.getProductById resolvesse, impedindo o Suspense de exibir o fallback (Skeleton) enquanto os dados carregam.
// ✔️ O Next.js renderiza imediatamente o Skeleton.
// ✔️ Quando os dados chegam, ele substitui pelo conteúdo carregado.
export default async function ProductDetailsAppPage({ params }: PageProps) {
return (
// ProductDetailsAppPage não é assíncrono, então ele renderiza imediatamente o <Suspense fallback={...}>.
<Suspense fallback={<ProductDetailsSkeleton />}>
{/_ Depois, o ProductDetails é assíncrono e só ele espera a API. Isso faz com que o Skeleton apareça enquanto os dados carregam. _/}
<ProductDetails params={params} />
</Suspense>
);
}
