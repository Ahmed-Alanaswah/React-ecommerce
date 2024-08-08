import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Container } from "react-bootstrap";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";

const Products = () => {
  // const params = useParams();
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);

  useEffect(() => {
    // if (params.prefix && typeof params.prefix == "string") {
    dispatch(actGetProductsByCatPrefix(prefix as string));
    // dispatch(actGetProductsByCatPrefix(params.prefix as string));
    // }
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return (
    <Container>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
