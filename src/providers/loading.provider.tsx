"use client"

// context/LoadingContext.tsx
import { Spinner } from "@/@lib-ui"
import React, { createContext, useState, useContext } from "react"

interface LoadingContextProps {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "#c2c2c2",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.4,
          }}
        >
          <Spinner color="blue" />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading deve ser usado dentro de um LoadingProvider")
  }
  return context
}
