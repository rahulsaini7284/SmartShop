import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  addToCartAction,
  removeFromCartAction,
} from "../redux/actions/cartAction";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Alert,
  Button,
  Card,
} from "react-bootstrap";
import Meta from "../Components/Meta";

const CartScreen = () => {
  const ID = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;
  const qty = new URLSearchParams(search).get("qty");
  useEffect(() => {
    if (ID && qty) {
      dispatch(addToCartAction(ID, Number(qty)));
    }
  }, [dispatch, ID, qty]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };
  // const checkOutHandler = (e) => {
  //     navigate("/signIn?redirect=/shipping");
  //   };
  const checkOutHandler = (e) => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Meta title={"Cart"} />
      <Row>
        <Col md={8}>
          <h1>Shoping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert variant="info">
              Your cart is empty{" "}
              <Link to="/" style={{ color: "red" }}>
                Go Back
              </Link>
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((p) => (
                <ListGroup.Item key={p.product}>
                  <Row>
                    <Col md={2} className="py-2">
                      <Link to={`/product/${p.product}`}>
                        <Image src={p.image} alt={p.name} rounded fluid />
                      </Link>
                    </Col>
                    <Col md={3} c>
                      <Link
                        to={`/product/${p.product}`}
                        className="text-decoration-none"
                      >
                        {p.name}
                      </Link>
                    </Col>
                    <Col md={2} className="py-2">
                      &#8377; {p.price}
                    </Col>
                    <Col md={2} xs={6}>
                      <Form.Control
                        as="select"
                        style={{ padding: "0" }}
                        value={p.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCartAction(p.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(p.countInStock).keys()].map((e) => (
                          <option key={e + 1}>{e + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} xs={6}>
                      <Button
                        type="button"
                        variant="light"
                        className="w-100 "
                        onClick={(e) => removeFromCartHandler(p.product)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {cartItems.length > 0 && (
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  &#8377;
                  {cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant="dark"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Procced To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};
export default CartScreen;
