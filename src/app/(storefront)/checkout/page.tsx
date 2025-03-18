"use client"

import { Step, useStepper } from "@/@lib-ui/src/core-components/stepper"
import { InputRadio } from "@/@lib-ui"
import { useState } from "react"

export default function CheckoutPage() {
  const { setData } = useStepper()
  const [isChecked, setIsChecked] = useState(true)

  return (
    <Step title="Escolha a forma de entrega">
      <InputRadio
        label="Enviar no meu endereço"
        toggleChecked={() => setIsChecked(!isChecked)}
        onClick={() =>
          setData({
            address: {
              rua: "rua tal",
              city: "cidade tal",
            },
          })
        }
      />
    </Step>
  )
}
