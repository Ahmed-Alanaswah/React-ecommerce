import { Loading, LottieHandler } from "@components/feedback";
import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import useCart from "@hooks/useCart";
const Cart = () => {
  const { products, changeQuantityHandler, removeItemHandler, loading, error } =
    useCart();
  return (
    <>
      <Heading title="Cart"></Heading>
      <Loading status={loading} error={error} type="cart">
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
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
