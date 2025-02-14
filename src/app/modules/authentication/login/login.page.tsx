import styles from "./login.page.module.css";
import { InputCheckbox } from "@/@lib-ui/src/core-components/input-checkbox";
import { Button, Form, Heading, Input, Text } from "@/@lib-ui";
import Github from "@/@lib-icons/src/icons/github";
import GoogleDrive from "@/@lib-icons/src/icons/google";

export function LoginPage() {
  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <Heading as="h5" size="small" weight="bold" className={styles.heading}>
          Entre na sua conta
        </Heading>
        <Text className={styles.subtext}>
          Informe seu e-mail e senha para autenticar
        </Text>
      </div>

      <Form className={styles.form}>
        <Input
          name="email"
          label="E-mail"
          placeholder="example@example.com"
          isFull
          required
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          placeholder="Informe sua senha"
          isFull
          required
        />
        <Button isFull variant="rounded">
          Autenticar
        </Button>
      </Form>

      <div className={styles["container-actions"]}>
        <InputCheckbox checkboxSize="small" label="Matenha-me conectado" />
        <Text decoration="link" size="medium">
          Esqueci minha senha
        </Text>
      </div>
    </div>
  );
}
