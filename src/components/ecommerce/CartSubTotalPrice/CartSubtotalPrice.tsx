import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";
import { actPlcaeOrder } from "@store/orders/ordersSlice";
import { TProduct } from "@types";
import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

type CartSubtotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};
const CartSubtotalPrice = ({
  products,
  userAccessToken,
}: CartSubtotalPriceProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const subtotal = products.reduce((accumulator, el) => {
    const price = +el.price;
    const quantity = el.quantity ? +el.quantity : 0;

    return accumulator + price * quantity;
  }, 0);
  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlcaeOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal show={showModal} onHide={modalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>plcaing order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          you sure to plcae order with subtotal: {""}
          {subtotal.toFixed(2)} JD
          {!loading && error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={placeOrderHandler}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> loading...
              </>
            ) : (
              "confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal.toFixed(2)} JD</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button onClick={modalHandler}>place order</Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
