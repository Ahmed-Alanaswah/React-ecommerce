import { Container } from "react-bootstrap";
import { Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { loading, error, productFullInfo, prefix } = useProducts();
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
