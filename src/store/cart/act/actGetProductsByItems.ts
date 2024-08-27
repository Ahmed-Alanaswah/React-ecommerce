import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TProduct } from "@customTypes/product";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

type TResponse = TProduct[];
const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;

    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    if (!itemsId.length) {
      fulfillWithValue([]);
    }
    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
