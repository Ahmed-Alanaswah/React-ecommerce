import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import { Category } from "@components/ecommerce";

import { Loading } from "@components/feedback";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();
  return (
    <Container>
      <Heading title="Categories"></Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
