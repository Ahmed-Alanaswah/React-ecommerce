import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const totalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce((a, b) => a + b, 0);
    return totalQuantity;
  }
);
export { totalQuantitySelector };
