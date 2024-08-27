import { Loading } from "@components/feedback";
import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import useCart from "@hooks/useCart";
const Cart = () => {
  const { products, changeQuantityHandler, removeItemHandler, loading, error } =
    useCart();
  return (
    <>
      <Heading title="Cart"></Heading>
      <Loading status={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              removeItemHandler={removeItemHandler}
              changeQuantityHandler={changeQuantityHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </Loading>
    </>
  );
};

export default Cart;
