import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";
interface Iwishlist {
  itemsId: number[];
  error: null | string;
  productsFullInfo: TProduct[];
  loading: TLoading;
}

const initialState: Iwishlist = {
  itemsId: [],
  error: null,
  productsFullInfo: [],
  loading: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanWishListProductFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type == "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el != action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id != action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload == "string")
        state.error = action.payload;
    });
    //get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload == "string")
        state.error = action.payload;
    });
  },
});
export const { cleanWishListProductFullInfo } = wishlistSlice.actions;
export { actLikeToggle, actGetWishlist };
export default wishlistSlice.reducer;
