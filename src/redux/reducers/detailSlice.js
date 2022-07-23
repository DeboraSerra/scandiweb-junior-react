import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const initialState = {
  product: {},
  loading: false,
  error: false,
}

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id) => {
  const query = gql`
    product(id: ${id}) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  `;
  const url = 'http://localhost:4000';
  const result = await request(url, query)
  return result.product;
})

const productReducer = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action?.payload?.message ?? 'Error fetching data';
      })
  }
})

export default productReducer.reducer;
