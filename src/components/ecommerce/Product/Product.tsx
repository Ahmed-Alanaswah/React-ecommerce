import { useEffect, useState, memo } from "react";
import { useAppDispatch } from "@store/hooks";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { addToCart } from "@store/cart/cartSlice";
const { product, productImg, maximumNotice } = styles;

const Product = memo(({ id, title, img, price, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isBtnDisabeld, setIsBtnDisabled] = useState(false);

  const currentremainingQuantity = max - (quantity ?? 0);
  const quantityReachedMax = currentremainingQuantity <= 0 ? true : false;

  const addToCardHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  useEffect(() => {
    if (!isBtnDisabeld) {
      return;
    }

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabeld]);
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} JD</h3>
      <p className={maximumNotice}>
        {quantityReachedMax
          ? "you reach  the limit "
          : `you can add ${currentremainingQuantity} time(s)`}
      </p>
      <Button
        onClick={addToCardHandler}
        variant="info"
        style={{ color: "white" }}
        disabled={isBtnDisabeld}
      >
        {isBtnDisabeld ? (
          <>
            <Spinner animation="border" size="sm" />
            Loading...
          </>
        ) : (
          " Add to cart"
        )}
      </Button>
    </div>
  );
});

export default Product;
