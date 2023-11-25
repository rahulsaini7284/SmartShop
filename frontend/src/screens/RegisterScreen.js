import React, { useState, useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import { Button, Col, Form, FormGroup, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRegisterAction } from "../redux/actions/userAction";
import { Message } from "../Components/Message";
import Meta from "../Components/Meta";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage("Password do not match");
    } else if (password && confirmPassword && name && email) {
      setMessage();
      dispatch(userRegisterAction({ email, password, name }));
    }
  };
  return (
    <>
      {" "}
      <Meta title={"Register Now"} />
      <FormContainer>
        <h1>Register User</h1>
        {message && <Message varient={"danger"} message={message} />}
        {error && <Message varient={"danger"} message={error} />}

        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <div>
            <div style={{ width: "75" }}>
              {" "}
              <Button
                className=" my-3 w-50"
                disabled={loading}
                variant="dark"
                type="submit"
              >
                {loading ? (
                  <>
                    {" "}
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden" />
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
            <div></div>
          </div>
        </Form>
        <Row>
          <Col>
            Have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
