import { PropsWithChildren } from "react"
import styles from "./layout.module.css"

export default function AuthenticationLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return <section className={styles.container}>{children}</section>
}
