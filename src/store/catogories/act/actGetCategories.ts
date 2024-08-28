import { ICategory } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = ICategory[];

const actGetCategories = createAsyncThunk(
  "catogories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>("/category", { signal });
      const data = response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.messsage || error.message);
      } else {
        return rejectWithValue("unexpected error");
      }
    }
  }
);

export default actGetCategories;
