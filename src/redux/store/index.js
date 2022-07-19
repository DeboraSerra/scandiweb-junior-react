import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartSlice';
import categoryReducer from '../reducers/categorySlice';
import currencyReducer from '../reducers/currencySlice';

const store = configureStore({
  reducer: {
    currencies: currencyReducer,
    cart: cartReducer,
    category: categoryReducer,
  }
})

export default store;
