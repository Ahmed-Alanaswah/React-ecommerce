import { useForm, SubmitHandler } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Heading } from "@components/common";
import { Col, Row } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "../validations/signUpSchema";
import { Input } from "@components/Form";
import useCheckEmailAvelability from "@hooks/useCheckEmailAvelability";

function Register() {
  const {
    resetCheckEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
  } = useCheckEmailAvelability();
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const submitForm: SubmitHandler<signUpType> = (data) => console.log(data);

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      console.log(value);
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

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
              disabled={emailAvailabilityStatus == "checking"}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
