"use client"

import { Heading, Input, Spinner } from "@/@lib-ui"
import styles from "./header.module.css"
import { CartIconBlack24, UserIconBlack24 } from "@/@lib-icons/src"
import Link, { useLinkStatus } from "next/link"
import { Navigation } from "./navigation"
import { useCart } from "@/modules/store/features/cart/use-cart"
import { usePathname } from "next/navigation"

export function Header() {
  const { cartItems } = useCart()
  const pathname = usePathname()
  const isCurrentPage = pathname === "/cart"

  function CartIconWithStatus({ value }: { value: number }) {
    const { pending } = useLinkStatus()

    return (
      <div style={{ position: "relative", height: "24px", width: "24px" }}>
        <CartIconBlack24 value={value} />
        <div style={{ position: "absolute", top: "0", right: "-64px" }}>
          {pending && <Spinner size="small" color="blue" />}
        </div>
      </div>
    )
  }

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
        {/* Por padrão, o Next.js pré-carrega (pré-busca) a página de destino quando você passa o mouse em cima de um <Link />. Isso acelera a navegação porque os dados já estão no cache quando você clica. */}
        {/* Quando você coloca prefetch={false}, você desativa esse comportamento de pré-carregamento automático. */}
        <Link
          href="/cart"
          prefetch={false}
          onClick={(e) => {
            if (isCurrentPage) {
              e.preventDefault()
            }
          }}
        >
          <CartIconWithStatus value={cartItems.length} />
        </Link>
        <Link href="/auth/login">
          <UserIconBlack24 />
        </Link>
      </div>
    </header>
  )
}
