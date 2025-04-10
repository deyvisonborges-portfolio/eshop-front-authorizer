"use client"

import styles from "./product-list.module.css"
import { useEffect } from "react"
import { ProductUIModel } from "../../product.ui-model"
import { ProductCard } from "../product-card"
import { useLoading } from "@/providers/loading.provider"
import { productsService } from "../../api/products.service"
import { useQuery } from "@tanstack/react-query"
import { Text } from "@/@lib-ui"
import { refreshListProductsPage } from "@/app/(storefront)/actions"

export function ProductsList() {
  const { startLoading, stopLoading } = useLoading()

  const { data: products, isFetching } = useQuery({
    queryKey: ["products"],
    staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
    queryFn: async () => {
      const response = await productsService.getAllProducts({
        cache: "force-cache",
      })
      return response.data
    },
  })

  useEffect(() => {
    if (isFetching) startLoading()
    else stopLoading()
  }, [isFetching])

  return isFetching ? (
    <p>Carregando produtos...</p>
  ) : (
    <div className={styles.list}>
      <button onClick={() => refreshListProductsPage()}>
        Revalidar pagina
      </button>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product: ProductUIModel) => (
          <ProductCard
            key={product.id}
            data={product}
            has={{ button: false }}
          />
        ))
      ) : (
        <Text>Sem produtos</Text>
      )}
    </div>
  )
}
