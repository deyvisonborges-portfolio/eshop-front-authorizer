import styles from "./payment-method-card.module.css"
import { PropsWithChildren, ReactElement } from "react"

export const PaymentMethods = {
  pix: "pix",
  boleto: "boleto",
  stripe: "stripe",
  mercadoPago: "mercadoPago",
}

type PaymentMethodCardProps = {
  method: keyof typeof PaymentMethods
  onClick: () => void
} & PropsWithChildren

export function PaymentMethodCard({ method, onClick }: PaymentMethodCardProps) {
  const renderIcon: Record<
    keyof typeof PaymentMethods,
    ReactElement<any, any>
  > = {
    pix: <img src="/pix.png" alt="Pix" width={48} />,
    boleto: <img src="/boleto.png" alt="Boleto" width={48} />,
    stripe: <img src="/stripe.png" alt="Stripe" width={48} />,
    mercadoPago: <img src="/mercado-pago.png" alt="Mercado Pago" height={48} />,
  }

  return (
    <div className={styles.card} onClick={onClick}>
      {renderIcon[method]}
    </div>
  )
}
