"use client";

import Image from "next/image";
import styles from "./details.module.css";
import { Button, Heading, Text } from "@/@lib-ui";
import { ProductUIModel } from "../../product.ui-model";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/providers/loading.provider";

type ProductDetailsPageProps = {
  product: ProductUIModel;
};

export function ProductDetailsPage({
  product: serverProduct,
}: ProductDetailsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { startLoading, stopLoading } = useLoading();

  const [product, setProduct] = useState(serverProduct);
  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  const updateQuery = useCallback(
    async (key: "size" | "color", value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });

      startLoading();
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
        const sizeParam = key === "size" ? `&size=${value}` : "";
        const colorParam = key === "color" ? `&color=${value}` : "";

        const res = await fetch(
          `${apiUrl}/products?id=${serverProduct.id}${sizeParam}${colorParam}`,
          { cache: "force-cache" }
        );

        if (!res.ok) throw new Error("Erro ao buscar produto");

        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        stopLoading();
      }
    },
    [searchParams, pathname, serverProduct.id]
  );

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src={product?.images?.[0] || "/placeholder.svg"}
          alt="Product image"
          width={600}
          height={600}
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <Heading as="h1" weight="bold" size="small" className={styles.title}>
          {product.name}
        </Heading>

        <div className={styles.pricing}>
          <Heading as="h4" size="small" weight="bold">
            R$ {product.price}
          </Heading>
          <Text size="small" className={styles.installments}>
            Em até 12x de R$ 24,99
          </Text>
        </div>

        <div className={styles.options}>
          <div className={styles.optionGroup}>
            <Text size="large" weight="bold">
              Tamanhos disponíveis
            </Text>
            <div className={styles.sizeButtons}>
              {product?.sizes?.map((_size) => (
                <Button
                  key={_size}
                  className={_size === size ? styles.focused : ""}
                  onClick={() => updateQuery("size", _size)}
                >
                  {_size}
                </Button>
              ))}
            </div>
          </div>

          <div className={styles.optionGroup}>
            <Text size="large" weight="bold">
              Cores disponíveis
            </Text>
            <div className={styles.colorButtons}>
              {product?.colors?.map((_color) => (
                <Button
                  key={_color}
                  className={_color === color ? styles.focused : ""}
                  onClick={() => updateQuery("color", _color)}
                >
                  {_color}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button className={styles.addToCart}>Adicionar ao carrinho</Button>
        </div>

        <div className={styles.description}>
          <h3 className={styles.descriptionTitle}>Descrição do produto</h3>
          <p className={styles.descriptionText}>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
