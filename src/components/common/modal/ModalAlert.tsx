import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAlert({
  children,
  show,
  setShow,
  packdrop,
}: {
  children: string;
  show: boolean;
  packdrop?: string;
  setShow: (a: boolean) => void;
}) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} packdrop={packdrop}>
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
