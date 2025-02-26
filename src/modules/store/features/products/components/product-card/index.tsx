import { Button } from "@/@lib-ui";
import styles from "./product-card.module.css";
import { ProductUIModel } from "../../product.ui-model";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ProductCardSkeleton } from "./skeleton";

type ProductCardProps = {
  data: ProductUIModel;
  isLoaded?: boolean;
  has?: { button?: boolean };
};

export function ProductCard({
  data,
  isLoaded = true,
  has = {},
}: ProductCardProps) {
  const router = useRouter();

  const handleSelectProduct = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, []);

  return isLoaded ? (
    <div className={styles.card} onClick={() => handleSelectProduct(data.id)}>
      <div className={styles.imageContainer}>
        <img
          src={data.images[0]}
          alt={data.description}
          className={styles.productImage}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{data.name}</h3>
        <div className={styles.pricing}>
          <div className={styles.price}>
            <span className={styles.originalPrice}>
              R$ {data.originalPrice}
            </span>
            <span className={styles.price}>R$ {data.price}</span>
          </div>
          <span className={styles.discount}>{data.discount}% OFF</span>
        </div>

        {has?.button && (
          <Button variant="rounded" className={styles.button}>
            Adicionar
          </Button>
        )}
      </div>
    </div>
  ) : (
    <ProductCardSkeleton />
  );
}
