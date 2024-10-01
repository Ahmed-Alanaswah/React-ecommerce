import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TOrderItem } from "@types";
import actPlcaeOrder from "./actPlaceOrder";

interface IOrderSlice {
  loading: TLoading;
  error: string | null;
  orderList: TOrderItem[];
}

const initialState: IOrderSlice = {
  loading: "idle",
  error: null,
  orderList: [],
};
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actPlcaeOrder.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actPlcaeOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlcaeOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { actPlcaeOrder };

export default ordersSlice.reducer;
