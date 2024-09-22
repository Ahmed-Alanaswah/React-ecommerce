import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Heading } from "@components/common";
import { Col, Row, Spinner } from "react-bootstrap";
import { Input } from "@components/Form";
import useRegister from "@hooks/useRegister";

function Register() {
  const {
    submitForm,
    emailOnBlurHandler,
    register,
    handleSubmit,
    errors,
    emailAvailabilityStatus,
    loading,
    error,
  } = useRegister();
  return (
    <>
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              name="firstName"
              error={errors.firstName?.message}
              register={register}
            />
            <Input
              label="Last Name"
              name="lastName"
              error={errors.lastName?.message}
              register={register}
            />
            <Input
              label="Email address"
              name="email"
              type="email"
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus == "notAvailable"
                  ? "this email  already exist"
                  : emailAvailabilityStatus == "failed"
                  ? "error from the server"
                  : ""
              }
              register={register}
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus == "checking"
                  ? "checking email please wait"
                  : ""
              }
              success={
                emailAvailabilityStatus == "available"
                  ? "this email available for use"
                  : ""
              }
              disabled={emailAvailabilityStatus == "checking"}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              error={errors.password?.message}
              register={register}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              error={errors.confirmPassword?.message}
              register={register}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus == "checking" || loading == "pending"
              }
            >
              {loading == "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
