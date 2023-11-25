import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { Loader } from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../Components/Message";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getOrderDetailsAction,
  orderDeliverAction,
  orderPayAction,
} from "../redux/actions/orderesActions";

import {
  userDetailsAction,
  userLoginResetAction,
} from "../redux/actions/userAction";
import {
  ADD_NEW_ORDER_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../redux/constants/orderConstants";
import axios from "axios";
import Meta from "../Components/Meta";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const ID = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const {
    success: deliverSuccess,
    loading: deliverLoading,
    error: orderDeliverError,
  } = useSelector((state) => state.orderDeliver);
  const { user, error: userDetailsError } = useSelector(
    (state) => state.userDetails
  );
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: orderPayError,
  } = orderPay;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!user) {
      dispatch(userDetailsAction("profile"));
    }
    if (userDetailsError && !user) {
      navigate("/login");
    }
    if (!order || successPay || ID !== order._id || deliverSuccess) {
      dispatch({ type: ORDER_PAY_RESET });
      if (deliverSuccess) {
        dispatch({ type: ORDER_DELIVER_RESET });
        Swal.fire("Delivered!", "Order Delivered Successfully", "success");
      }
      dispatch(getOrderDetailsAction(ID));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    if (
      orderPayError ||
      orderDeliverError ||
      userDetailsError === "Session has expired Please Login First"
    ) {
      dispatch(userDetailsAction("profile"));
      dispatch(userLoginResetAction());
    }

  }, [
    ID,
    dispatch,
    successPay,
    navigate,
    userDetailsError,
    orderPayError,
    orderDeliverError,
    deliverSuccess,
    user,
    order,
  ]);
  useEffect(()=>{
    dispatch({type:ADD_NEW_ORDER_RESET})
  },[dispatch])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(orderPayAction(ID, paymentResult));
  };

  useEffect(() => {
    if (!user) {
      dispatch(userDetailsAction("profile"));
    }
  }, [loading, user, dispatch, ID]);

  const handleOrderDeliver = () => {
    dispatch(orderDeliverAction(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message message={error} varient={"danger"} />
  ) : (
    <>
      <Meta title={"Order Screen"} />
      <div className="d-flex">
        <Button variant="light" className="mr-2">
          <Link to={!user?.isAdmin ? "/profile" : "/admin/ordersList"}>
            <i className="fa-solid fa-arrow-left fa-2xl"></i>
          </Link>
        </Button>
        <h3 className="overflow-auto">Order - {order._id}</h3>
      </div>
      <hr />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong style={{ fontWeight: "bold" }}>Name: </strong>{" "}
                {order.user.name}
              </p>
              <p>
                <strong style={{ fontWeight: "bold" }}>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong style={{ fontWeight: "bold" }}>Address</strong>:{" "}
                {order.shippingAddress.landmark},{order.shippingAddress.city},
                {order.shippingAddress.district},{order.shippingAddress.pincode}
                ,{order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message
                  message={`Delivered at ${order.deliveredAt.substring(0, 10)}`}
                  varient={"success"}
                />
              ) : (
                <Message message={"Not Delivered"} varient={"danger"} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <strong style={{ fontWeight: "bold" }}>Method</strong>:{" "}
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message
                  message={`Paid at ${order.paidAt.substring(0, 10)}`}
                  varient={"success"}
                />
              ) : (
                <Message message={"Not Paid"} varient={"danger"} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              {order.orderItems.length === 0 ? (
                <Message message={"Your Cart Is Empty"} />
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Link
                            className="text-decoration-none"
                            to={`/product/${item.product}`}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Link>
                        </Col>
                        <Col>
                          <Link
                            className="text-decoration-none"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          {item.qty} x {item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item as="h4">Order Summary</ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>
                    &#x20B9;{" "}
                    {order.totalPrice - (order.shippingPrice + order.taxPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    &#x20B9; {order.shippingPrice ? order.shippingPrice : 0}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>&#x20B9;{order.taxPrice ? order.taxPrice : 0}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>&#x20B9;{order.totalPrice ? order.totalPrice : 0}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && !user?.isAdmin && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                <Button
                  className="py-2.5  w-75 m-2 mx-auto"
                  disabled={deliverLoading}
                  variant="dark"
                  type="submit"
                  onClick={handleOrderDeliver}
                >
                  {deliverLoading ? (
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
                    <>
                      <i className="fa-solid fa-check fa-lg mr-2"></i>
                      Mark As Delivered
                    </>
                  )}
                </Button>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
