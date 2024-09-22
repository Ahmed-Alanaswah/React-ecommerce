import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Heading } from "@components/common";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import { Input } from "@components/Form";
import useLogin from "@hooks/useLogin";
function Login() {
  const {
    submitForm,
    handleSubmit,
    register,
    errors,
    loading,
    error,
    searchParames,
    setSearchParams,
  } = useLogin();
  return (
    <>
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParames.get("message") === "account_created" && (
            <Alert variant="success">
              your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email address"
              name="email"
              type="email"
              error={errors.email?.message}
              register={register}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              error={errors.password?.message}
              register={register}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading == "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error ? (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            ) : (
              ""
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
