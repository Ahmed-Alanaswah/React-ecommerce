import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  cleanUpProductRecords,
} from "@store/products/productsSlice";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemId = useAppSelector((state) => state.wishlist.itemsId);

  const productFullInfo = records.map((el) => ({
    ...el,
    quantity: el.id ? cartItems[el.id] : 0,
    isLiked: wishlistItemId.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(prefix as string));
    return () => {
      promise.abort();

      dispatch(cleanUpProductRecords());
    };
  }, [dispatch, prefix]);
  return { loading, error, productFullInfo, prefix };
};

export default useProducts;
