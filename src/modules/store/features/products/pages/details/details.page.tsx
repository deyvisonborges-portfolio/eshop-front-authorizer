"use client";

import Image from "next/image";
import styles from "./details.module.css";
import { Button, Heading, Text } from "@/@lib-ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Blur } from "@/@lib-ui/src/core-components/blur";

type Attribute = "size" | "color";

export function ProductDetailsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (value === size || value === color) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(`${pathname}?${params.toString()}`, undefined);
    },
    [searchParams, router, pathname]
  );

  return (
    <div className={styles.container}>
      {/* <Blur /> */}
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
          Nome do Produto
        </Heading>

        <div className={styles.pricing}>
          <Heading as="h4" size="small" weight="bold">
            R$ 299,90
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
              {["P", "M", "G", "GG"].map((_size) => (
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
              {["Preto", "Branco", "Azul"].map((_color) => (
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
          <p className={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
}
