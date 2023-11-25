import React, { useEffect } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../Components/Message";
import { Link, useNavigate } from "react-router-dom";
import { addNewOrderAction } from "../redux/actions/orderesActions";
import Meta from "../Components/Meta";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { order, loading, error, success } = useSelector(
    (state) => state.createOrder
  );

  let {
    shippingAddress,
    paymentMethod,
    cartItems,
    taxPrice,
    shippingPrice,
    itemsPrice,
    totalPrice,
  } = useSelector((state) => state.cart);

  itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  taxPrice = (0.04 * itemsPrice).toFixed(2);
  shippingPrice = itemsPrice > 1000 ? 100 : 40;
  if (itemsPrice && taxPrice && shippingPrice) {
    totalPrice = Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice);
    totalPrice=Number(totalPrice).toFixed(2);
  }
  const placeOrderHandler = (e) => {
    e.preventDefault();
    if (
      shippingAddress &&
      paymentMethod &&
      cartItems &&
      taxPrice &&
      shippingPrice &&
      itemsPrice &&
      totalPrice &&
      userInfo
    ) {
      dispatch(
        addNewOrderAction({
          shippingAddress,
          paymentMethod,
          orderItems: cartItems,
          taxPrice,
          shippingPrice,
          totalPrice,
        })
      );
    }
  };

  useEffect(() => {
    if (success && order) {
      navigate(`/order/${order._id}`);
    }
  }, [success, order, navigate]);
  return (
    <>
      <Meta title={"Place Order"} />
      <CheckoutSteps step1 step2 step3 step4 />
      <hr />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong style={{ fontWeight: "bold" }}>Address</strong>:{" "}
                {shippingAddress.landmark},{shippingAddress.city},
                {shippingAddress.district},{shippingAddress.pincode},
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong style={{ fontWeight: "bold" }}>Method</strong>:{" "}
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message message={"Your Cart Is Empty"} />
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
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
              <ListGroup.Item as="h2">Order Summary</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>&#x20B9;{itemsPrice ? itemsPrice : 0}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#x20B9;{shippingPrice ? shippingPrice : 0}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>&#x20B9;{taxPrice ? taxPrice : 0}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>&#x20B9;{totalPrice ? totalPrice : 0}</Col>
                </Row>
              </ListGroup.Item>
              {error && !success && (
                <ListGroup.Item>
                  <Message message={error} varient="danger" />
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  // className="my-3 py-2.5 w-50"
                  className="btn-block"
                  variant="dark"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={loading ? true : false}
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
                    "Place Order"
                  )}
                </Button>
                {/* <Button
                  variant="dark"
                  type="button"
                  className="btn-block"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button> */}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
