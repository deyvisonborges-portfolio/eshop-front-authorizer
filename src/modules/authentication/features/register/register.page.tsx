import styles from "./register.module.css"
import { RegisterForm } from "./components/register-form"
import { Heading, Text } from "@/@lib-ui"
import Link from "next/link"

export function RegisterPage() {
  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <Heading as="h5" size="small" weight="bold" className={styles.heading}>
          Faça seu cadastro
        </Heading>
        <Text className={styles.subtext}>
          Já possui uma conta?{" "}
          <Link href="/login">
            <Text type="span" decoration="link">
              Autenticar
            </Text>
          </Link>
        </Text>
      </div>
      <RegisterForm />
    </div>
  )
}
