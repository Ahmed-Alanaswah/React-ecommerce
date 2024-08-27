import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  cleanWishListProductFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      dispatch(cleanWishListProductFullInfo());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: el.id ? cartItems[el.id] : 0,
    isLiked: true,
  }));
  return { loading, error, records };
};

export default useWishlist;
