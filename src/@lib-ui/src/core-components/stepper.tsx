"use client"

import React, { createContext, useContext, useState } from "react"
import styles from "./stepper.module.css"

type StepperContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  stepsCount: number
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
  initialStep?: number
}

export function Stepper({ children, initialStep = 0 }: StepperProps) {
  const [activeStep, setActiveStep] = useState(initialStep)
  const childrenArray = React.Children.toArray(children)
  const stepsCount = childrenArray.length

  return (
    <StepperContext.Provider value={{ activeStep, setActiveStep, stepsCount }}>
      <div className={styles.stepper}>
        <div className={styles.stepperHeader}>
          {childrenArray.map((_, index) => (
            <div
              key={index}
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
        <div className={styles.stepContent}>{childrenArray[activeStep]}</div>
        <div className={styles.stepperActions}>
          <button
            className={styles.button}
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
          >
            Previous
          </button>
          <button
            className={styles.button}
            onClick={() =>
              setActiveStep(Math.min(stepsCount - 1, activeStep + 1))
            }
            disabled={activeStep === stepsCount - 1}
          >
            Next
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
