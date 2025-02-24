"use client";

import Image from "next/image";
import styles from "./details.module.css";
import { Button, Heading, Text } from "@/@lib-ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "@/providers/loading.provider";
import { ProductUIModel } from "../../product.ui-model";
import { ProductDetailsSkeleton } from "./skeleton";

type Attribute = "size" | "color";

export function ProductDetailsPage({ params }: { params: { id?: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const [product, setProduct] = useState<ProductUIModel>();

  const { id } = params;
  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  const createQueryString = useCallback(
    (name: Attribute, value: string) => {
      if (value === size || value === color) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      const push = `${pathname}?${params.toString()}`;
      // adicionar logica de chamr o servico
      router.push(push, undefined);
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      startLoading();
      try {
        const res = await (await fetch("/api/products?id=" + id)).json();
        setProduct(res.data);
      } catch (error) {
      } finally {
        stopLoading();
      }
    };

    fetchProducts();
  }, [id]);

  console.log(product);
  return isLoading ? (
    <ProductDetailsSkeleton />
  ) : (
    product && (
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <Image
              src="/placeholder.svg"
              alt="Product image"
              width={600}
              height={600}
              className={styles.image}
            />
          </div>
          <div className={styles.thumbnails}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.thumbnail}>
                <Image
                  src="/placeholder.svg"
                  alt={`Product thumbnail ${i + 1}`}
                  width={150}
                  height={150}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
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
                    className={[
                      styles.sizeButton,
                      _size === size ? styles.focused : "",
                    ].join(" ")}
                    onClick={() => createQueryString("size", _size)}
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
                    className={[
                      styles.colorButton,
                      _color === color ? styles.focused : "",
                    ].join(" ")}
                    onClick={() => createQueryString("color", _color)}
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
    )
  );
}
