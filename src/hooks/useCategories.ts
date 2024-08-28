import {
  actGetCategories,
  cleanCateoriesRecords,
} from "@store/catogories/catogeriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
      promise.abort();
      dispatch(cleanCateoriesRecords());
    };
  }, [dispatch]);

  return { loading, error, records };
};

export default useCategories;
