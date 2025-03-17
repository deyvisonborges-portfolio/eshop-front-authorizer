import styles from "./navigation.module.css"

export function Navigation() {
  return (
    <ul className={styles.menu}>
      <li className={styles["menu-item"]}>
        <a>Shop</a>
      </li>
      <li className={styles["menu-item"]}>
        <a>Mais vistos</a>
      </li>
      <li className={styles["menu-item"]}>
        <a>Novos</a>
      </li>

      <li className={styles["menu-item"]}>
        <a>Marcas</a>
      </li>
    </ul>
  )
}
