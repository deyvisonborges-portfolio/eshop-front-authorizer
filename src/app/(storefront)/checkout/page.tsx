"use client"

import { useStepper } from "@/@lib-ui/src/core-components/stepper"
import { useEffect } from "react"

export default function CheckoutPage() {
  const { setActiveStep } = useStepper()

  useEffect(() => {
    setActiveStep(0)
  }, [])
}
