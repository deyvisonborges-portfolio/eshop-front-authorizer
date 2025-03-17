"use client"

import styles from "./details.module.css"
import { Heading, Text } from "@/@lib-ui"

export function ProductDetailsSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.mainImage}>
          <div className={styles.skeleton} />
        </div>
        <div className={styles.thumbnails}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.thumbnail}>
              <div className={styles.skeleton} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.details}>
        <Heading
          as="h1"
          weight="bold"
          size="small"
          className={styles.skeletonBox}
        >
          &nbsp;
        </Heading>

        <div className={styles.pricing}>
          <Heading
            as="h4"
            size="small"
            weight="bold"
            className={styles.skeletonBox}
          >
            &nbsp;
          </Heading>
          <Text size="small" className={styles.skeletonBox}>
            &nbsp;
          </Text>
        </div>

        <div className={styles.options}>
          <div className={styles.optionGroup}>
            <Text size="large" weight="bold" className={styles.skeletonBox}>
              &nbsp;
            </Text>
            <div className={styles.sizeButtons}>
              {[...Array(3)].map((_, i) => (
                <p key={i} className={styles.skeletonBox}>
                  &nbsp;
                </p>
              ))}
            </div>
          </div>

          <div className={styles.optionGroup}>
            <Text size="large" weight="bold" className={styles.skeletonBox}>
              &nbsp;
            </Text>
            <div className={styles.colorButtons}>
              {[...Array(3)].map((_, i) => (
                <button key={i} className={styles.skeletonBox}>
                  &nbsp;
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.skeletonBox}> &nbsp; </button>
        </div>

        <div className={styles.description}>
          <h3 className={styles.skeletonBox}>&nbsp;</h3>
          <p className={styles.skeletonBox}>&nbsp;</p>
        </div>
      </div>
    </div>
  )
}
