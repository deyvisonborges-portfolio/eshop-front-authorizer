import { Button } from "@/@lib-ui";
import styles from "./product-card.module.css";

export function ProductCard() {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src="https://placehold.co/200x200"
          alt="Bingo Original Style Chilli Chips"
          className={styles.productImage}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>
          Bingo Original Style Chilli Sprinkled Potato Chips 90g
        </h3>
        <div className={styles.pricing}>
          <div className={styles.price}>
            <span className={styles.originalPrice}>R$ 50.00</span>
            <span className={styles.price}>R$ 33.00</span>
          </div>
          <span className={styles.discount}>34% OFF</span>
        </div>

        {/* <div className={styles.delivery}>
          <span className={styles.deliveryIcon}>🚚</span>
          2-4 Days
          <span className={styles.rating}>⭐ 4.1</span>
        </div> */}

        <Button variant="rounded" className={styles.button}>
          Adicionar
        </Button>
      </div>
    </div>
  );
}
