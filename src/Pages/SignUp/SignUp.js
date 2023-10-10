import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";
import "../SignUp/SignUp.css";
import { SignUpSchema } from "../../Schema/Schema";
import { addUser } from "../../API/API";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function SignUp() {
  const navigate = useNavigate();
  let CreatedTimeDate = moment().format("MMMM Do YYYY");

  const [error, setError] = useState("");
  const uuid = uuidv4();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignUpSchema),
  });

  const submit = async (data, event) => {
    event.preventDefault();

    let updatedData = _.cloneDeep(data);
    updatedData = { ...updatedData, ...data, userId: uuid };

    updatedData.createdAt = CreatedTimeDate;
    delete updatedData.confirmPassword;
    console.log("🚀 ~ file: SignUp.js:32 ~ submit ~ updatedData:", updatedData);

    const newUser = await addUser(updatedData);
    if (newUser && data.password === data.confirmPassword) {
      reset({ confirmPassword: "" });
      navigate("/login");
    } else if (data.confirmPassword !== data.password) {
      setError("Please Check Confirm Password");
    } else {
      setError("");
    }
  };

  const goToLogInForm = () => {
    navigate("/login");
  };

  return (
    <>
      <div style={{ background: "#302525", height: "100vh" }} className="main">
        {/* <img src={Logo} alt="logo" width={150} height={150} /> */}

        <Form onSubmit={handleSubmit(submit)} className="m-auto">
          <h3 className="text-white mb-4">SignUp</h3>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white">First Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("firstName")}
                  placeholder="Enter First Name..."
                  className="p-2"
                />
                <Form.Text className="text-muted"></Form.Text>
                <span className="text-danger gap-0">
                  {errors.firstName?.message}
                </span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("lastName")}
                  placeholder="Enter Last Name..."
                  className="p-2"
                />
                <Form.Text className="text-muted"></Form.Text>
                <span className="text-danger">{errors.lastName?.message}</span>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-white">Email address</Form.Label>
            <Form.Control
              type="email"
              {...register("email")}
              placeholder="Enter email..."
              className="p-2"
            />
            <Form.Text className="text-muted"></Form.Text>
            <span className="text-danger">{errors.email?.message}</span>
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password")}
                  placeholder="Enter Password..."
                  className="p-2"
                />
                <span className="text-danger">{errors.password?.message}</span>
              </Form.Group>
            </Col>

            <br />
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-white">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Enter Confirm Password..."
                  className="p-2"
                />
                <span className="text-danger">
                  {errors.confirmPassword?.message}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Button variant="primary  btn-lg me-2 mb-3" type="submit">
            SignUp
          </Button>
          <span className="text-white">
            Already,Have an account?{" "}
            <span onClick={goToLogInForm} className="text-success ">
              LogIn
            </span>
          </span>
          <br />
          <span className="text-danger bg-white py-2 ">{error}</span>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
