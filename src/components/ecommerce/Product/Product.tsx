import { useEffect, useState, memo } from "react";
import { useAppDispatch } from "@store/hooks";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import ModalAlert from "@components/common/modal/ModalAlert";
import ProductInfo from "../ProductInfo/ProductInfo";

const { product, productImg } = styles;

const Product = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    isLiked,
    authenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabeld, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const currentremainingQuantity = max - (quantity ?? 0);
    const quantityReachedMax = currentremainingQuantity <= 0 ? true : false;
    const [show, setShow] = useState(false);
    const addToCardHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    // Only use useEffect for button debounce logic
    useEffect(() => {
      if (!isBtnDisabeld) return;
      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);
      return () => clearTimeout(debounce);
    }, [isBtnDisabeld]);

    const likeToggleHandler = () => {
      if (authenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShow(true);
      }
    };

    return (
      <ProductInfo title={title} price={Number(price)} img={img}>
        <div className={product}>
          <div className={productImg}>
            {img ? (
              <img
                src={img}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#e0e7ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  color: "#6366f1",
                  fontWeight: 700,
                }}
              >
                No Image
              </div>
            )}
          </div>
          <ModalAlert show={show} setShow={setShow}>
            please login required
          </ModalAlert>
          <div onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" color="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p>
            {quantityReachedMax
              ? "you reach  the limit "
              : `you can add ${currentremainingQuantity} time(s)`}
          </p>
          <Button
            onClick={addToCardHandler}
            variant="info"
            style={{ color: "white", width: "100%" }}
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
      </ProductInfo>
    );
  }
);

export default Product;
