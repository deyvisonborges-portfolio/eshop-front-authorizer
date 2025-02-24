// app/product/[id]/page.tsx
import Image from "next/image";
import styles from "./details.module.css";
import { Button, Heading, Text } from "@/@lib-ui";
import { ProductUIModel } from "../../product.ui-model";
import { Suspense } from "react";
import { ProductDetailsSkeleton } from "./skeleton";
import { VariantSelector } from "../../components/variant-select";
import { revalidatePath } from "next/cache";

// const getProduct = async (id: string) => {
//   const res = await (
//     await fetch(`http://localhost:3000/api/products?id=${id}`, {
//       cache: "force-cache",
//     })
//   ).json();
//   return res.data;
// };

export async function ProductDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id?: string | undefined }>;
  searchParams: Promise<{
    size?: string | undefined;
    color?: string | undefined;
  }>;
}) {
  const id = (await params).id;
  const size = (await searchParams).size;
  const color = (await searchParams).color;

  const apiUrl = process.env.API_URL || "http://localhost:3000/api"; // Fallback para ambiente local
  const sizeParam = size ? `&size=${size}` : "";
  const colorParam = color ? `&color=${color}` : "";

  const res = await fetch(
    `${apiUrl}/products?id=${id}${sizeParam}${colorParam}`,
    {
      cache: "no-store",
    }
  );
  const product: ProductUIModel = (await res.json()).data;

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src={"/placeholder.svg"}
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

        {/* <div className={styles.options}>
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
                  // onClick={() => createQueryString("size", _size)}
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
                  // onClick={() => createQueryString("color", _color)}
                >
                  {_color}
                </Button>
              ))}
            </div>
          </div>
        </div> */}
        <Suspense fallback={<p>Loading...</p>}>
          <VariantSelector initialData={product} productId={product.id} />
        </Suspense>
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
