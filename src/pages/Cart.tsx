import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
} from "@store/cart/cartSlice";
import { Loading } from "@components/feedback";
import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(actGetProductsByItems());
  }, [dispatch]);

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
  return (
    <>
      <Heading>Cart</Heading>
      <Loading status={loading} error={error}>
        <CartItemList
          products={products}
          removeItemHandler={removeItemHandler}
          changeQuantityHandler={changeQuantityHandler}
        />
      </Loading>

      <CartSubtotalPrice products={products} />
    </>
  );
};

export default Cart;
