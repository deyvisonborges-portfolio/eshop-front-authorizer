"use client";

import styles from "./product-list.module.css";
import { useEffect, useState } from "react";
import { ProductUIModel } from "../../product.ui-model";
import { ProductCard } from "../product-card";
import { useLoading } from "@/providers/loading.provider";
import { productsService } from "../../api/products.service";

export function ProductsList() {
  const [products, setProducts] = useState<ProductUIModel[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const controller = new AbortController().signal;

  useEffect(() => {
    const fetchProducts = async () => {
      startLoading();
      try {
        const res = await productsService.getAllProducts({
          signal: controller,
        });
        setProducts(res.data);
      } catch (error) {
      } finally {
        stopLoading();
      }
    };

    fetchProducts();
  }, []);

  return isLoading ? (
    <p>Carregando produtos...</p>
  ) : (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} data={product} has={{ button: false }} />
      ))}
    </div>
  );
}
