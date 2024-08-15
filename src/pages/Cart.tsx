import { Heading } from "@components/common";
import { CartItem, CartSubtotalPrice } from "@components/ecommerce";
const Cart = () => {
  return (
    <>
      <Heading>Cart</Heading>
      <CartItem />
      <CartSubtotalPrice />
    </>
  );
};

export default Cart;
