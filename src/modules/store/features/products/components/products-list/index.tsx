"use client";

import styles from "./product-list.module.css";
import { useEffect, useState } from "react";
import { ProductUIModel } from "../../product.ui-model";
import { ProductCard } from "../product-card";

export function ProductsList() {
  const [products, setProducts] = useState<ProductUIModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await (await fetch("/api/products")).json();
      console.log(res);
      setProducts(res.data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return loading ? (
    <p>Carregando produtos...</p>
  ) : (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} data={product} has={{ button: false }} />
      ))}
    </div>
  );
}
