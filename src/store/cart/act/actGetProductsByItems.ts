import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async () => {}
);

export default actGetProductsByItems;
