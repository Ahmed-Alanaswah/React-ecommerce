import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, resetOrderStatus } from "@store/orders/ordersSlice";
import { TProduct } from "@types";

const useOrders = () => {
  const dispatch = useAppDispatch();
  const { loading, error, orderList } = useAppSelector((state) => state.orders);
  const [showModal, setShowModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id == id);
    const newItem = productDetails?.items ?? [];

    setShowModal(true);
    setSelectProduct((prev) => [...prev, ...newItem]);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);
  return {
    closeModalHandler,
    loading,
    error,
    viewDetailsHandler,
    selectProduct,
    showModal,
    orderList,
  };
};

export default useOrders;
