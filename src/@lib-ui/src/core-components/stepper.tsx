"use client"

import React, { createContext, useCallback, useContext, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import styles from "./stepper.module.css"

type StepperContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  stepsCount: number
  data: any
  setData: (data: any) => void
}

const StepperContext = createContext<StepperContextType | undefined>(undefined)

export function useStepper() {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error("useStepper must be used within a Stepper component")
  }
  return context
}

type StepperProps = {
  children: React.ReactNode
  steps: { title: string; path: string }[] // Define as rotas dos steps
}

export function Stepper({ children, steps }: StepperProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [data, _setData] = useState<Record<string, any>>({})

  const activeStep = steps.findIndex((step) => step.path === pathname)
  const stepsCount = steps.length

  const setActiveStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      router.push(steps[step].path)
    }
  }

  const setData = useCallback((data: any) => {
    _setData((prev) => ({ ...prev, ...data }))
  }, [])

  return (
    <StepperContext.Provider
      value={{ activeStep, setActiveStep, stepsCount, data, setData }}
    >
      <div className={styles.stepper}>
        <div className={styles.stepperHeader}>
          {steps.map((step, index) => (
            <div
              key={step.path}
              className={`${styles.stepIndicator} ${index === activeStep ? styles.active : ""} ${index < activeStep ? styles.completed : ""}`}
              onClick={() => setActiveStep(index)}
            >
              {index < activeStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.checkIcon}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
          ))}
          <div className={styles.stepperLine}>
            <div
              className={styles.stepperProgress}
              style={{ width: `${(activeStep / (stepsCount - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.stepContent}>{children}</div>

        <div className={styles.stepperActions}>
          <button
            className={styles.button}
            onClick={() => setActiveStep(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Anterior
          </button>
          <button
            className={styles.button}
            onClick={() => setActiveStep(activeStep + 1)}
            disabled={activeStep === stepsCount - 1}
          >
            Próximo
          </button>
        </div>
      </div>
    </StepperContext.Provider>
  )
}

type StepProps = {
  children: React.ReactNode
  title?: string
}

export function Step({ children, title }: StepProps) {
  return (
    <div className={styles.step}>
      {title && <h3 className={styles.stepTitle}>{title}</h3>}
      <div>{children}</div>
    </div>
  )
}
