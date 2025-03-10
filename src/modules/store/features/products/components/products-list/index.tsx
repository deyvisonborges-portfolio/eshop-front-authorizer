"use client";

import styles from "./product-list.module.css";
import { useEffect } from "react";
import { ProductUIModel } from "../../product.ui-model";
import { ProductCard } from "../product-card";
import { useLoading } from "@/providers/loading.provider";
import { productsService } from "../../api/products.service";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/@lib-ui";

export function ProductsList() {
  const { startLoading, stopLoading } = useLoading();

  const { data: products, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productsService.getAllProducts();
      return response.data;
    },
  });

  // TODO: melhorar isso aqui
  useEffect(() => {
    if (isFetching) {
      startLoading();
      return;
    }
    stopLoading();
  }, [isFetching]);

  return isFetching ? (
    <p>Carregando produtos...</p>
  ) : (
    <div className={styles.list}>
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
  );
}
