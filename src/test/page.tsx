import { Button, ButtonColor, ButtonSize, ButtonVariant, Form } from "@/@lib-ui"
import styles from "./page.module.css"

import buttons from "./buttons.json"

export default function TestPage() {
  return (
    <Form utilities={[styles.test, styles.otherTest]}>
      {buttons.button_groups.map((button) => {
        return (
          <div>
            <h1 style={{ color: "var(--color-brand-primary)" }}>
              {button.variant}
            </h1>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                columnGap: "40px",
                flexWrap: "wrap",
              }}
            >
              {button.buttons.map((b) => (
                <Button
                  key={b.label}
                  variant={button.variant as ButtonVariant}
                  color={b.color as ButtonColor}
                  size={b.size as ButtonSize}
                >
                  {b.label}
                </Button>
              ))}
            </div>
          </div>
        )
      })}
      <Button variant="pill" size="large">
        Teste
      </Button>
    </Form>
  )
}
