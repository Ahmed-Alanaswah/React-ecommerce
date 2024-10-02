import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TOrderItem } from "@types";
import actPlcaeOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

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
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //orders
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

    //orders by user
    builder.addCase(actGetOrders.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { actPlcaeOrder, actGetOrders };
export const { resetOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
