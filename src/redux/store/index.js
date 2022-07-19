import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartSlice';
import currencyReducer from '../reducers/currencySlice';

const store = configureStore({
  reducer: {
    currencies: currencyReducer,
    cart: cartReducer,
  }
})

export default store;
