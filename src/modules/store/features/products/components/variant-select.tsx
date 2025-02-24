"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { use, useEffect, useLayoutEffect, useState } from "react";
import { Button, Text } from "@/@lib-ui";
import styles from "../../products/pages/details/details.module.css";
import { ProductUIModel } from "../product.ui-model";
import { useLoading } from "@/providers/loading.provider";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const VariantSelector = ({
  productId,
  initialData,
}: {
  productId: string;
  initialData: ProductUIModel;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [product, setProduct] = useState<ProductUIModel>(initialData);
  // const [isLoading, setIsLoading] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  const updateQuery = async (key: "size" | "color", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      startLoading();
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
        const sizeParam = size ? `&size=${size}` : "";
        const colorParam = color ? `&color=${color}` : "";

        const res = await fetch(
          `${apiUrl}/products?id=${productId}${sizeParam}${colorParam}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar produto");

        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        stopLoading();
      }
    };

    fetchProduct();
  }, [productId, size, color]);

  return (
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
  );
};
