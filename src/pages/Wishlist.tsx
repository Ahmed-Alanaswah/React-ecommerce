import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  cleanWishListProductFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const Wishlist = () => {
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

  return (
    <>
      <Heading title="Wishlist"></Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
