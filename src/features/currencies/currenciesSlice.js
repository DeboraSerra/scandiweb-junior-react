import { createSlice } from '@reduxjs/toolkit';

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    currencies: [],
  },
  reducers: {
    fetchedCurrencies: (state, action) => {
      state.currencies = action.payload;
    }
  }
})

export const { fetchedCurrencies } = currenciesSlice.actions;

export default currenciesSlice.reducer;
