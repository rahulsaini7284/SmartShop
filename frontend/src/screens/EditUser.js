import React, { useState, useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import Meta from "../Components/Meta";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";

import { useSelector, useDispatch } from "react-redux";
import {
  adminUserDetailsAction,
  adminUserUpdateAction,
  userDetailsAction,
  userLoginResetAction,
} from "../redux/actions/userAction";
import { Message } from "../Components/Message";
import { ADMIN_USER_UPDATE_RESET } from "../redux/constants/userConstants";

const EditUserScreen = () => {
  const navigate = useNavigate();
  const ID = useParams().id;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const {
    error,
    loading: load,
    ADMIN_user,
  } = useSelector((state) => state.adminUserDetails);
  const {
    error: updationError,
    loading,
    success,
  } = useSelector((state) => state.adminUserUpdate);

  useEffect(() => {
    if (success) {
      dispatch({ type: ADMIN_USER_UPDATE_RESET });
      navigate(`/admin/usersList`);
    } else {
      if (!ADMIN_user || ADMIN_user._id !== ID) {
        dispatch(adminUserDetailsAction(ID));
      } else {
        setName(ADMIN_user.name);
        setEmail(ADMIN_user.email);
        setIsAdmin(ADMIN_user.isAdmin);
      }
    }
    if (updationError === "Session has expired Please Login First") {
      dispatch(userDetailsAction("profile"));
      dispatch(userLoginResetAction());
    }
  }, [dispatch, ADMIN_user, ID, updationError, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminUserUpdateAction(ID, { name, email, isAdmin }));
  };
  return (
    <>
      <Meta title={"Edit User"} />
      <Button variant="light" className="mr-2">
        <Link to={"/admin/usersList"}>
          <i className="fa-solid fa-arrow-left fa-2xl"></i>
        </Link>
      </Button>
      <FormContainer>
        <h1>Edit User</h1>
        {updationError ? (
          <Message message={error} varient={"danger"} />
        ) : load ? (
          <Loader />
        ) : (
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
            <FormGroup controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                label=" Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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
                    "Update"
                  )}
                </Button>
              </div>
              <div></div>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUserScreen;
