import { useEffect, useState, memo } from "react";
import { useAppDispatch } from "@store/hooks";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({ id, title, img, price, max, quantity, isLiked }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabeld, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const likeToggleHandler = () => {
      if (!isLoading) {
        setIsLoading(true);
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    };
    return (
      <div className={product}>
        <div className={wishlistBtn} onClick={likeToggleHandler}>
          {isLoading ? (
            <Spinner animation="border" size="sm" color="primary" />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{Number(price).toFixed(2)} JD</h3>
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
  }
);

export default Product;
