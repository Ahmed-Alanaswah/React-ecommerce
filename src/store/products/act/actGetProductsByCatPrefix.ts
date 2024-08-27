import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";
type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCatPrefix;
