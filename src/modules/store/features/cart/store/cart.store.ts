import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductAPIModel } from "../../products/api/product.api-model";

export type CartState = Pick<
  ProductAPIModel,
  "id" | "name" | "price" | "originalPrice" | "stock" | "quantity"
> & { size: string; color: string };

const initialState: { items: CartState[] } = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartState>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== String(id));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === String(id));
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
