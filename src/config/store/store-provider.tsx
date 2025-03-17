"use client"

import { useRef } from "react"
import { Provider } from "react-redux"
import { AppStore, store } from "./store"
import { Persistor, persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  const persistorRef = useRef<Persistor>({} as Persistor)

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store()
    persistorRef.current = persistStore(storeRef.current)
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  )
}
