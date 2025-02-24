"use client";

import styles from "./product-list.module.css";
import { useEffect, useState } from "react";
import { ProductUIModel } from "../../product.ui-model";
import { ProductCard } from "../product-card";
import { useLoading } from "@/providers/loading.provider";

export function ProductsList() {
  const [products, setProducts] = useState<ProductUIModel[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchProducts = async () => {
      startLoading();
      try {
        const res = await (await fetch("/api/products")).json();
        console.log(res);
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
