import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import { TLoading } from "@types";

const skeletonsTypes = {
  category: CategorySkeleton,
  cart: CartSkeleton,
  product: ProductSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
};
const Loading = ({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = skeletonsTypes[type];
  if (status == "pending") {
    return <Component />;
  }

  if (status == "failed") {
    return <p>{error}</p>;
  }
  return <>{children}</>;
};

export default Loading;
