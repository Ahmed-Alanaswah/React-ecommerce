import { useForm, SubmitHandler } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Heading } from "@components/common";
import { Col, Row } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "../validations/signUpSchema";
// import { signUpSchema, signUpType } from "@validations/signUpSchema";
import { Input } from "@components/Form";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const submitForm: SubmitHandler<signUpType> = (data) => console.log(data);
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

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              error={errors.confirmPassword?.message}
              register={register}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
