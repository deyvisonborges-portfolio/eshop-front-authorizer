import styles from "./product-card.module.css";

export function ProductCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div
        className={`${styles.imageContainer} ${styles.skeletonBox}`}
        style={{ height: "200px", width: "100%" }}
      />
      <div className={styles.info}>
        <div
          className={`${styles.title} ${styles.skeletonBox}`}
          style={{ height: "24px", width: "80%" }}
        />
        <div
          className={`${styles.pricing} ${styles.skeletonBox}`}
          style={{ height: "20px", width: "60%" }}
        />
        <div
          className={`${styles.button} ${styles.skeletonBox}`}
          style={{ height: "40px", width: "100%" }}
        />
      </div>
    </div>
  );
}
