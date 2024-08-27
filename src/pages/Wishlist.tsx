import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { loading, error, records } = useWishlist();
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
