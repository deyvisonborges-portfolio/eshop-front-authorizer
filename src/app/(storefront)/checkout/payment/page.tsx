"use client"

import { useStepper } from "@/@lib-ui/src/core-components/stepper"
import {
  PaymentMethodCard,
  PaymentMethods,
} from "@/modules/store/features/checkout/components/payment-method-card"

export default function PaymentAppPage() {
  const { setData, data } = useStepper()
  return (
    <div>
      {Object.values(PaymentMethods).map((method) => (
        <PaymentMethodCard
          method={method as any}
          onClick={() => setData({ ...data, paymentMethod: method })}
        />
      ))}
    </div>
  )
}
