"use client";

import { useAppSelector } from "@/config/store/store";
import { useCallback } from "react";
import { cartActions, CartState } from "./store/cart.store";
import { useDispatch } from "react-redux";

export function useCart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddItem = useCallback((item: CartState) => {
    dispatch(cartActions.addItem(item));
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    dispatch(cartActions.removeItem(id));
  }, []);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    dispatch(cartActions.updateQuantity({ id, quantity }));
  }, []);

  const handleClearCart = useCallback(() => {
    dispatch(cartActions.clearCart());
  }, []);

  return {
    cartItems,
    handleAddItem,
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart,
  };
}
