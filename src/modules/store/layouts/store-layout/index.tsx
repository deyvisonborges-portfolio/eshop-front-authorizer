import { Header } from "./components/header";
import styles from "./store-layout.module.css";
import { PropsWithChildren } from "react";

export function StoreLayout({ children }: PropsWithChildren) {
  return (
    <main className={styles.container}>
      <Header />
      <section>{children}</section>
    </main>
  );
}
