"use client";

import { InputCheckbox } from "@/@lib-ui/src/core-components/input-checkbox";
import styles from "./form-login.module.css";
import { Button, Form, Heading, Input, Text } from "@/@lib-ui";
import Github from "@/@lib-icons/src/icons/github";
import GoogleDrive from "@/@lib-icons/src/icons/google";

export function FormLogin() {
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
        <Input name="email" placeholder="example@example.com" isFull />
        <Button isFull variant="rounded">
          Sign In with Email
        </Button>
      </Form>

      <div className={styles["remember-me-container"]}>
        <InputCheckbox label="Matenha-me conectado" />
      </div>

      <hr />

      <div className={styles.social}>
        <div className={styles["social-item"]}>
          <Github />
        </div>
        <div className={styles["social-item"]}>
          <GoogleDrive />
        </div>
      </div>
    </div>
  );
}
