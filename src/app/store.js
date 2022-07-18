import { configureStore } from '@reduxjs/toolkit';
import { currenciesSlice } from '../features/currencies/currenciesSlice';

const store = configureStore({
  reducer: {
    currencies: currenciesSlice,
  },
});

export default store;
