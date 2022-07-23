import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
}

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id)
      if (index !== -1 && state.cart[index].selectedAttributes.every(({ value }) => action.payload.selectedAttributes.includes(value))) {
        const amount = state.cart[index].amount;
        state.cart[index] = { ...state.cart[index], amount: amount + action.payload.amount }
      } else state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      const newCart = state.cart.filter((item) => item.id !== action.payload.id);;
      state.cart = newCart;
    },
    increase: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        const amount = state.cart[index].amount;
        state.cart[index] = { ...state.cart[index], amount: amount + 1 }
      }
    },
    decrease: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        const amount = state.cart[index].amount;
        state.cart[index] = { ...state.cart[index], amount: amount - 1 }
      }
    },
  }
})

export const { addItem, removeItem, increase, decrease } = cartReducer.actions;

export default cartReducer.reducer;
