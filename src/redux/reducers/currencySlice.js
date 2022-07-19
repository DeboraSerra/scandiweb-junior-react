import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const initialState = {
  currencies: [],
  loading: false,
  error: false,
  selectedCurr: 'USD',
}

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async () => {
  const query = gql`
    {
      currencies {
        label
        symbol
      }
    }
  `
  const url = 'http://localhost:4000';
  const result = await request(url, query);
  return result.currencies;
})

const currencyReducer = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    selectCurr: (state, action) => {
      state.selectedCurr = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.currencies = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action?.payload?.message ?? 'Error fetching data';
      })
  }
})

export const { selectCurr } = currencyReducer.actions;

export default currencyReducer.reducer;
