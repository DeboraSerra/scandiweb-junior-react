import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartSlice';
import categoryReducer from '../reducers/categorySlice';
import currencyReducer from '../reducers/currencySlice';
import productReducer from '../reducers/detailSlice';

const store = configureStore({
  reducer: {
    currencies: currencyReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
  }
})

export default store;
