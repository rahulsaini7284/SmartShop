import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Spinner,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  userDetailsAction,
  userUpdateProfileAction,
} from "../redux/actions/userAction";
import { Loader } from "../Components/Loader";
import { Message } from "../Components/Message";
import { myOrdersListAction } from "../redux/actions/orderesActions";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import { ORDER_PAY_RESET } from "../redux/constants/orderConstants";
import Meta from "../Components/Meta";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user, error, loading } = useSelector((state) => state.userDetails);
  const {
    success,
    loading: load,
    error: userUpdateError,
  } = useSelector((state) => state.userUpdate);
  const { success: successPay } = useSelector((state) => state.orderPay);

  const {
    myOrdersList,
    loading: loadingMyOrders,
    error: errorMyOrders,
  } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || successPay) {
        if (success) {
          Swal.fire("Done!", "User Updated Successfully", "success");
        }
        dispatch(userDetailsAction("profile"));
        dispatch(myOrdersListAction());
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch({ type: ORDER_PAY_RESET });
      } else {
        setPassword("");
        setConfirmPassword("");
        setName(user.name);
        setEmail(user.email);
      }
    }
    if (
      error ||
      errorMyOrders ||
      userUpdateError === "Session has expired Please Login First"
    ) {
      dispatch(userDetailsAction("profile"));
      navigate("/login");
    }
  }, [
    user,
    dispatch,
    userInfo,
    navigate,
    success,
    successPay,
    error,
    errorMyOrders,
    userUpdateError,
  ]);
  useEffect(() => {
    dispatch(myOrdersListAction());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire(
        "Password Mismatch!",
        "Please Enter Password Carefully!",
        "warning"
      );
    } else {
      dispatch(userUpdateProfileAction({ name, email, password }));
    }
  };

  return (
    <>
      <Meta title={"My Profile"} />
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message message={error} varient={"danger"} />
          ) : (
            user && (
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
                  <Form.Label>Email</Form.Label>
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
                    placeholder="Enter Password"
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

                <Button
                  className="my-3 py-2.5 w-50"
                  variant="dark"
                  type="submit"
                  disabled={load ? true : false}
                >
                  {load ? (
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
              </Form>
            )
          )}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingMyOrders ? (
            <Loader />
          ) : errorMyOrders ? (
            <Message message={errorMyOrders} varient={"danger"} />
          ) : myOrdersList?.length === 0 ? (
            <Message message={"Your Order List Is Empty...!"} />
          ) : (
            <Table responsive striped hover bordered className="table-sm">
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">DATE</th>
                  <th className="text-center">TOTAL</th>
                  <th className="text-center">PAID</th>
                  <th className="text-center">DELIVERED</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {myOrdersList?.map((order) => (
                  <tr key={order._id}>
                    <td className="text-center">{order._id}</td>
                    <td className="text-center">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="text-center">{order.totalPrice}</td>
                    <td className="text-center">
                      {!order.isPaid ? (
                        <i
                          className="fa-regular fa-circle-xmark  fa-xl "
                          style={{ color: "#c70000" }}
                        ></i>
                      ) : (
                        order.paidAt.substring(0, 10)
                      )}
                    </td>
                    <td className="text-center">
                      {!order.deliverdAt ? (
                        <i
                          className="fa-regular fa-circle-xmark  fa-xl"
                          style={{ color: "#c70000" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-regular fa-circle-check  fa-xl"
                          style={{ color: "#106a22" }}
                        ></i>
                      )}
                    </td>
                    <td className="text-center">
                      <LinkContainer to={`/order/${order._id}`}>
                        <p>
                          <i
                            className="fa-solid fa-circle-info fa-2xl"
                            style={{ color: "#e07800" }}
                          ></i>
                        </p>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
