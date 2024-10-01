import { TProduct } from "./product.types";

export type TOrderItem = {
  id: number;
  userId: number;
  subtotal: number;
  items: TProduct[];
};
