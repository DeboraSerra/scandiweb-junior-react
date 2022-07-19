import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000';

const initialState = {
  allCategories: [],
  category: '',
  products: [],
  allProducts: [],
  loading: false,
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

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  const query = gql`
    {
      categories {
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
  return result.categories;
})

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.category = action.payload.category;
      state.products = state.allProducts.find(({ name }) => name === action.payload.category);
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
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.loading = false;
      })
  }
})

export const { selectCategory } = categoryReducer.actions;

export default categoryReducer.reducer;
