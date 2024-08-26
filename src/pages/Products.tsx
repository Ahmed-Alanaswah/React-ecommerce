import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Container } from "react-bootstrap";
import {
  actGetProductsByCatPrefix,
  cleanUpProductRecords,
} from "@store/products/productsSlice";
import { Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";

const Products = () => {
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
    dispatch(actGetProductsByCatPrefix(prefix as string));

    return () => {
      dispatch(cleanUpProductRecords());
    };
  }, [dispatch, prefix]);

  return (
    <Container>
      <Heading title={`${prefix?.toUpperCase()} Products`}></Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={productFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
