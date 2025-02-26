"use client";

import styles from "./details.module.css";
import { Button, Heading, Text } from "@/@lib-ui";
import { ProductUIModel } from "../../product.ui-model";
import { useEffect, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/providers/loading.provider";
import Image from "next/image";

type ProductDetailsPageProps = {
  product: ProductUIModel;
};

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { startLoading, stopLoading } = useLoading();
  const [isPending, startTransition] = useTransition();

  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  const updateQuery = (key: "size" | "color", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    startTransition(() =>
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    );
  };

  useEffect(() => {
    if (isPending) {
      startLoading();
      return;
    }
    stopLoading();
  }, [isPending]);

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
