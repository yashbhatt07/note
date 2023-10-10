import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// import { login } from "../../API/Users";

import "./Login.css";
import { LoginSchema } from "../../Schema/Schema";
import { useNavigate } from "react-router-dom";
import { login } from "../../API/API";
// import _ from 'lodash'

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
  });

  const goToSignUpForm = () => {
    navigate("/signup");
  };

  useEffect(() => {
    localStorage.removeItem("auth");
  }, []);

  const submit = async (data, event) => {
    event.preventDefault();

    // LoginSchema.validate(data);
    try {
      const onLogin = await login(data);
      console.log("🚀 ~ file: Login.jsx:44 ~ submit ~ data:", data);

      if (onLogin && onLogin !== "") {
        console.log("🚀 ~ file: Login.js:44 ~ submit ~ onLogin:", onLogin);
        localStorage.setItem("auth", true);
        localStorage.setItem("user", JSON.stringify(onLogin));
        const getUser = JSON.parse(localStorage.getItem("user"));
        return navigate(`/board/${getUser.userId}`, { replace: true });
      } else {
        setError("Wrong Credential");
      }
    } catch (err) {
      console.log("🚀 ~ file: Login.js:54 ~ submit ~ err:", err);
    }
  };

  return (
    <>
      <div
        style={{ background: "#302525", height: "100vh" }}
        className="main-l"
      >
        <Form onSubmit={handleSubmit(submit)} className="m-auto">
          <h3 className="text-white mb-4 "> Login</h3>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password")}
              placeholder="Enter Password..."
              className="p-2"
            />
            <span className="text-danger ">{errors.password?.message}</span>
          </Form.Group>
          <br />

          <Button variant="primary  btn-lg me-2 mb-2" type="submit">
            Login
          </Button>

          <span className="text-white">
            Don't have an account?
            <span onClick={goToSignUpForm} className="text-success">
              SignUp
            </span>
          </span>
          <br />
          <span className="text-danger py-1 bg-white ">{error}</span>
        </Form>
      </div>
    </>
  );
};

export default Login;
