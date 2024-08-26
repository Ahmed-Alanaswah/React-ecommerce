import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import { Category } from "@components/ecommerce";
import { cleanCateoriesRecords } from "@store/catogories/catogeriesSlice";
import { actGetCategories } from "@store/catogories/catogeriesSlice";
import { Loading } from "@components/feedback";

const Categories = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(cleanCateoriesRecords());
    };
  }, [dispatch]);

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
