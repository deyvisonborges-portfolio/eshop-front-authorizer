import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { cartSlice } from "@/modules/store/features/cart/store/cart.store"

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist"
import storage from "./ssr-safe-storage"

const persistConfig = {
  key: "persist",
  storage,
  whitelist: ["cart"],
}

const rootReducers = combineReducers({
  cart: cartSlice.reducer,
})

// https://stackoverflow.com/questions/77783551/how-to-use-redux-persist-with-next-js-app-router
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
