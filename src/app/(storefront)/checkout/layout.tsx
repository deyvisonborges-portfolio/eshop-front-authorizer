import { Stepper } from "@/@lib-ui/src/core-components/stepper"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Stepper
      steps={[
        { title: "Entrega", path: "/checkout/shipping-address" },
        { title: "Pagamento", path: "/checkout/payment" },
      ]}
    >
      {children}
    </Stepper>
  )
}
