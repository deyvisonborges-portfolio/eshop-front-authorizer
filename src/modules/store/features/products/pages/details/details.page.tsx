"use client";

import styles from "./details.module.css";
import { Button, Heading, Text } from "@/@lib-ui";
import { ProductUIModel } from "../../product.ui-model";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/providers/loading.provider";
import { productsService } from "../../api/products.service";

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
      // router.refresh();

      startLoading();
      try {
        // Criar um objeto de queryParams e garantir que não adicionamos chaves vazias
        const queryParams: Record<string, string> = {};

        if (key === "size") {
          queryParams.size = value;
          if (color) queryParams.color = color; // Mantém a cor existente se houver
        } else if (key === "color") {
          queryParams.color = value;
          if (size) queryParams.size = size; // Mantém o tamanho existente se houver
        }

        const result = await productsService.getProductByIdAndParams(
          serverProduct.id,
          queryParams
        );

        setProduct(result);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        stopLoading();
      }
    },
    [searchParams, pathname, serverProduct.id, size, color]
  );

  return (
    <div className={styles.container}>
      {/* <div className={styles.imageSection}>
        <Image
          src={product?.images?.[0] || "/placeholder.svg"}
          alt="Product image"
          width={600}
          height={600}
          className={styles.image}
        />
      </div> */}

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
