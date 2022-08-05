import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000';

const initialState = {
  allCategories: [],
  category: 'all',
  products: { products: [] },
  allProducts: [],
  loading: true,
  loadingProd: true,
}

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const query = gql`
    {
      categories {
        name
      }
    }
  `
  const result = await request(url, query);
  return result.categories;
})

export const fetchCategory = createAsyncThunk('category/fetchCategory', async (name) => {
  const query = gql`
    {
      category(input: { title: "${name}" }) {
        name
        products {
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
      }
    }
  `
  const result = await request(url, query);
  return result.category;
})

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.category = action.payload.category;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.allCategories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.loadingProd = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loadingProd = false;
      })
  }
})

export const { selectCategory } = categoryReducer.actions;

export default categoryReducer.reducer;
