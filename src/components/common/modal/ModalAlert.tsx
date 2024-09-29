import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAlert({
  children,
  show,
  setShow,
}: {
  children: string;
  show: boolean;
  setShow: (a: boolean) => void;
}) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAlert;
