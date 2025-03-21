"use client"

import { Step, useStepper } from "@/@lib-ui/src/core-components/stepper"
import { useCart } from "@/modules/store/features/cart/use-cart"

export default function CheckoutReviewAppRoute() {
  const { data } = useStepper()
  const { cartItems } = useCart()
  return (
    <Step title="Revisar pedido e confirmar">
      <pre>
        <h3>Faturamento</h3>
        <p>Nome: John Doe</p>
        <p>Email: jhondoe@example.com</p>
      </pre>

      <pre>
        <h3>Detalhes da entrega</h3>
        <p>{data.addrees?.street}</p>
      </pre>

      <pre>
        {cartItems.map((cart) => (
          <code>
            <img src={cart.miniThumbUrl} alt="" width={24} />
            <p>{cart.name}</p>
          </code>
        ))}
      </pre>

      <pre>
        <h3>Detalhes de pagamento</h3>
        <span>{data.paymentMethod}</span>

        <pre>Ao confirmar a compra, você terá as informações para pagar.</pre>
      </pre>
    </Step>
  )
}
