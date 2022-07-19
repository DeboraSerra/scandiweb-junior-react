import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../reducers/currencySlice';

const store = configureStore({
  reducer: {
    currencies: currencyReducer,
  }
})

export default store;
