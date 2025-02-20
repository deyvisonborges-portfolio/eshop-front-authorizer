import styles from "./layout.module.css";
import { PropsWithChildren } from "react";
import { Heading, Input } from "@/@lib-ui";

export default function StoreLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles["header-left"]}>
          <Heading as="h5" size="small" weight="bold">
            eshop
          </Heading>

          <Input name="search" placeholder="Busque o que procura" />
        </div>

        <div className={styles["header-right"]}>
          <i>X</i>
        </div>
      </header>
      <section>{children}</section>
    </main>
  );
}
