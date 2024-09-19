import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Heading } from "@components/common";
import { Col, Row } from "react-bootstrap";
import { Input } from "@components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema, signInType } from "../validations/signInSchema";
// import { signInSchema, signInType } from "@validations/signInSchema";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });
  const submitForm: SubmitHandler<signInType> = (data) => console.log(data);
  return (
    <>
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
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
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
