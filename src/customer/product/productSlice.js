import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addFilters,
  addProducts,
  fetchAllProducts,
  fetchAllUserProducts,
  fetchById,
  fetchFilterBrand,
  fetchFilterCategory,
  fetchFilterGender,
  fetchFilterProducts,
  updateProduct,
} from "./productAPI";

const API_URL = "https://e-zpb7.onrender.com/products";

const initialState = {
  products: [],
  category: [],
  brand: [],
  gender: [],
  byid: null,
  status: "idle",
  error: null,
  filter: null,
  userProducts: [],
};
const addFilterAsync = createAsyncThunk("filter", async (data) => {
  const response = await addFilters(data);
  return response;
});
const fetchAllProductsAsync = createAsyncThunk("products", async () => {
  try {
    const response = await fetchAllProducts();

    return response;
  } catch (error) {
    throw error;
  }
});
const fetchAllUserProductsAsync = createAsyncThunk("Userproducts", async () => {
  try {
    const response = await fetchAllUserProducts();
    return response;
  } catch (error) {
    throw error;
  }
});
const addProductsAsync = createAsyncThunk("addProducts", async (data) => {
  try {
    const response = await addProducts(data);
    return response;
  } catch (error) {
    throw error;
  }
});
const fetchFilterBrandAsync = createAsyncThunk("brand", async () => {
  try {
    const response = await fetchFilterBrand();

    return response;
  } catch (error) {
    throw error;
  }
});
const fetchFilterCategoryAsync = createAsyncThunk("category", async () => {
  try {
    const response = await fetchFilterCategory();
    return response;
  } catch (error) {
    throw error;
  }
});
const updateProductAsync = createAsyncThunk("updateProduct", async (data) => {
  const response = await updateProduct(data);
  return response;
});
const fetchFilterGenderAsync = createAsyncThunk("gender", async () => {
  try {
    const response = await fetchFilterGender();
    return response;
  } catch (error) {
    throw error;
  }
});

const fetchAllFilterProductsAsync = createAsyncThunk(
  "filterProduct",
  async (data) => {
    try {
      const response = await fetchFilterProducts(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
const fetchByIdAsync = createAsyncThunk("filterById", async (id) => {
  try {
    const response = await fetchById(id);
    return response;
  } catch (error) {
    throw error;
  }
});
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetById: (state, action) => {
      state.byid = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterProductsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllFilterProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.products = [];
        state.error = action.error.message; // Store the error message
      })
      .addCase(fetchFilterBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brand = action.payload;
        state.error = null;
      })
      .addCase(fetchFilterBrandAsync.rejected, (state, action) => {
        state.status = "idle";
        state.brand = [];
        state.error = action.error.message; // Store the error message
      })
      .addCase(fetchFilterCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
        state.error = null;
      })
      .addCase(fetchFilterCategoryAsync.rejected, (state, action) => {
        state.status = "idle";
        state.category = [];
        state.error = action.error.message; // Store the error message
      })
      .addCase(addProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(addProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.category = [];
        state.error = action.error.message; // Store the error message
      })
      .addCase(fetchFilterGenderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.gender = action.payload;
        state.error = null;
      })
      .addCase(fetchFilterGenderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.gender = [];
        state.error = action.error.message;
      })
      .addCase(fetchByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.byid = action.payload;
        state.error = null;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(addFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.filter = action.payload;
      })
      .addCase(fetchAllUserProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProducts = action.payload;
      });
  },
});

export const { resetById } = productSlice.actions;
export default productSlice.reducer;
export {
  addFilterAsync,
  fetchAllProductsAsync,
  fetchAllUserProductsAsync,
  addProductsAsync,
  fetchFilterBrandAsync,
  fetchFilterCategoryAsync,
  updateProductAsync,
  fetchFilterGenderAsync,
  fetchAllFilterProductsAsync,
  fetchByIdAsync,
};
