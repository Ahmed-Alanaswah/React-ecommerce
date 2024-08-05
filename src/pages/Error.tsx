import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "react-bootstrap";
const Error = () => {
  const error = useRouteError();
  let erroSrtatus: number;
  let errorStatusText: string;
  if (isRouteErrorResponse(error)) {
    erroSrtatus = error.status;
    errorStatusText = error.statusText;
  } else {
    erroSrtatus = 404;
    errorStatusText = "page not found";
  }
  return (
    <Container className="notFound">
      <h1>{erroSrtatus}</h1>
      <p>{errorStatusText}</p>
      <Link to="/" replace={true}>
        go back
      </Link>
    </Container>
  );
};

export default Error;
