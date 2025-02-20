import { Heading, Input } from "@/@lib-ui";
import styles from "./header.module.css";
import { CartIconBlack24, UserIconBlack24 } from "@/@lib-icons/src";
import Link from "next/link";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        <Heading as="h5" size="small" weight="bold">
          eshop
        </Heading>

        <Navigation />
      </div>

      <div className={styles["header-right"]}>
        <Input name="search" placeholder="Busque o que procura" />
        <CartIconBlack24 />
        <Link href="/auth/login">
          <UserIconBlack24 />
        </Link>
      </div>
    </header>
  );
}
