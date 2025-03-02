"use client";

import { Heading, Input } from "@/@lib-ui";
import styles from "./header.module.css";
import { CartIconBlack24, UserIconBlack24 } from "@/@lib-icons/src";
import Link from "next/link";
import { Navigation } from "./navigation";
import { useCart } from "@/modules/store/features/cart/use-cart";

export function Header() {
  const { cartItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        <Link href="/">
          <Heading as="h5" size="small" weight="bold">
            eshop
          </Heading>
        </Link>
        <Navigation />
      </div>

      <div className={styles["header-right"]}>
        <Input name="search" placeholder="Busque o que procura" />
        <Link href="/cart" prefetch={false}>
          <CartIconBlack24 value={cartItems.length} />
        </Link>
        <Link href="/auth/login">
          <UserIconBlack24 />
        </Link>
      </div>
    </header>
  );
}
