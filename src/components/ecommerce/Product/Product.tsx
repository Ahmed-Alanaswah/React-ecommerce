import { useAppDispatch } from "@store/hooks";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { addToCart } from "@store/cart/cartSlice";
const { product, productImg } = styles;

const Product = ({ id, title, img, price }: TProduct) => {
  const dispatch = useAppDispatch();
  const addToCardHandler = () => {
    dispatch(addToCart(id));
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} JD</h3>
      <Button
        onClick={addToCardHandler}
        variant="info"
        style={{ color: "white" }}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
