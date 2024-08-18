import { TProduct } from "@customTypes/product";
import CartItem from "../CartItem/CartItem";

type CartIemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
};

const CartItemList = ({
  products,
  changeQuantityHandler,
}: CartIemListProps) => {
  const renerList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
    />
  ));
  return <div>{renerList}</div>;
};

export default CartItemList;
