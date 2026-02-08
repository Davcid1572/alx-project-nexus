import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/interfaces";

interface ProductsState {
  items: Product[];
  categories: string[]; // Store category names from API
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  searchQuery: "",
  selectedCategory: null,
  loading: false,
  error: null,
};

// Thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return (await res.json()) as Product[];
  },
);

// Thunk to fetch category list
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    return (await res.json()) as string[];
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to change the active category
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load products";
      })
      // Handle fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSelectedCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
