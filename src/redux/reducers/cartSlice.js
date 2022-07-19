import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
}

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      const newCart = state.cart.filter((item) => item.id !== action.payload.id);;
      state.cart = newCart;
    },
  }
})

export const { addItem, removeItem } = cartReducer.actions;

export default cartReducer.reducer;
