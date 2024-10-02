import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanProductfullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const plcaeOrderStatus = useAppSelector((state) => state.orders.loading);
  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(cleanProductfullInfo());
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    products,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
    plcaeOrderStatus,
    loading,
    error,
  };
};

export default useCart;
