import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LottieHandler } from "@components/feedback";
const Error = () => {
  return (
    <Container className="notFound">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <LottieHandler type="notFound" />
        <Link to="/" replace={true}>
          go back
        </Link>
      </div>
    </Container>
  );
};

export default Error;
