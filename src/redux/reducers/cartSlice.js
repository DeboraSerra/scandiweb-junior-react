import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
}

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.cart.findIndex((it) => it.id === action.payload.id
        && it.attributesSelected.every(({ id, item }) => action.payload.attributesSelected
          .find((att) => att.id === id && att.item === item)))
      if (index !== -1) {
        const amount = state.cart[index].amount;
        state.cart[index] = { ...state.cart[index], amount: amount + action.payload.amount }
      } else state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      const index = state.cart.findIndex((it) => it.id === action.payload.id
        && it.attributesSelected.every(({ id, item }) => action.payload.attributesSelected
          .find((att) => att.id === id && att.item === item)));
      state.cart.splice(index, 1);
    },
    increase: (state, action) => {
      const index = state.cart
        .findIndex((item) => item.id === action.payload.id
          && item.name === action.payload.name
          && item.attributesSelected.every(({ id, item }) => action.payload.attributesSelected
            .find((att) => att.id === id && att.item === item)))
      if (index !== -1) {
        const amount = state.cart[index].amount;
        state.cart[index] = { ...state.cart[index], amount: amount + 1 }
      }
    },
    decrease: (state, action) => {
      const index = state.cart
        .findIndex((item) => item.id === action.payload.id
          && item.name === action.payload.name
          && item.attributesSelected.every(({ id, item }) => action.payload.attributesSelected
          .find((att) => att.id === id && att.item === item)))
      if (index !== -1) {
        const amount = state.cart[index].amount;
        state.cart[index] = { ...state.cart[index], amount: amount - 1 }
      }
    },
  }
})

export const { addItem, removeItem, increase, decrease } = cartReducer.actions;

export default cartReducer.reducer;
