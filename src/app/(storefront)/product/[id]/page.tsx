import { Button } from "@/@lib-ui"
import { productsService } from "@/modules/store/features/products/api/products.service"
import { ProductDetailsPage } from "@/modules/store/features/products/pages/details/details.page"
import { ProductDetailsSkeleton } from "@/modules/store/features/products/pages/details/skeleton"
import { Suspense } from "react"

type PageProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ size?: string; color?: string }>
}

async function ProductDetails({ params, searchParams }: PageProps) {
  const { id } = await params
  const filters = searchParams ? await searchParams : {}

  const product = await productsService.getProductByIdAndParams(id, filters, {
    cache: "force-cache",
    next: { tags: ["product", `product-${id}`] },
  })
  const serverTime = new Date().toISOString()

  console.log(serverTime)

  return <ProductDetailsPage product={product} serverTimestamp={serverTime} />
}

/**
 * @description
 * Essa função não é async, pois não:
 * - Faz nenhuma operação assíncrona diretamente;
 * - Ela não faz fetch de dados diretamente;
 * - O efeito de Streaming do Next.js funciona corretamente;
 * - O Next.js não precisa esperar nada antes de começar a renderizar.
 *
 * O Suspense permite que o resto da página seja renderizado enquanto ProductDetails busca os dados.
 * O ProductDetailsSkeleton é exibido até os dados estarem prontos.
 *
 * Se ProductDetailsAppPage fosse async, o Next.js só começaria a renderizar a página
 * inteira depois de buscar os dados, o que quebraria o efeito de streaming do Suspense. 🚀
 *
 * Se renderizarmos de forma assincrona, funciona, porem:
 * - O Next.js vai esperar a resolução da função antes de renderizar a página.
 * - Toda a renderização da página será bloqueada até que a Promise resolva. Isso quebraria o Streaming do Next.js.
 * Obs.: quando usamos o generateMetadata por exemplo, que é assincrono, ele bloqueia toda a renderizacao
 *
 * // Interessante observar
 * @link https://dev.to/peterlidee/synchronous-and-asynchronous-searchparams-in-next-15-3c7a
 */
export default function ProductDetailsAppPage({
  params,
  searchParams,
}: // TODO: to implement https://www.youtube.com/shorts/CNGIAZ2ZBpw?feature=share
PageProps) {
  return (
    /**
     * @description
     * - O Suspense permite que o Next.js carregue partes da página enquanto espera os dados, exibindo ProductDetailsSkeleton no lugar.
     * - Carregamento parcial dentro da mesma página
     * - Nao permite carregamento global (antes da página ser visível)
     * - Carregamento de uma seção específica
     * - Nao faz o carregamento de uma nova página
     * - Como so tenho esse caso em especifico, nao vou me preocupar em criar o loading.tsx
     */

    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails params={params} searchParams={searchParams} />
    </Suspense>
  )
}

// // generateMetadata síncrono, usando dados passados pelo layout.
// export async function generateMetadata({ params, searchParams }: PageProps) {
//   const { id } = await params;
//   const filters = (await searchParams) || {};

//   const product = await productsService.getProductByIdAndParams(id, filters, {
//     cache: "default",
//     next: { revalidate: 3 },
//   });

//   return {
//     title: product.name,
//     description: product.description,
//   };
// }
