import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import NewRating from "../Components/NewRating";

import {
  getProduct,
  productCreateReviewAction,
} from "../redux/actions/productActions";
import { Loader } from "../Components/Loader";
import { Message } from "../Components/Message";
import { userDetailsAction } from "../redux/actions/userAction";
import Swal from "sweetalert2";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/productConstants";
import Meta from "../Components/Meta";

const ProductScreen = () => {
  const Navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  let ID = useParams().id;
  const dispatch = useDispatch();

  const { product, error, loading } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success, error: reviewError } = useSelector(
    (state) => state.productCreateReview
  );

  useEffect(() => {
    if (!product || product._id !== ID) {
      if (userInfo) {
        dispatch(userDetailsAction("profile"));
      }
      dispatch(getProduct(ID));
    }
    if (success) {
      dispatch(getProduct(ID));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setComment("");
      setRating(1);
      Swal.fire("Thanks for Review!", "Review Added Successfully.", "success");
    } else if (reviewError) {
      setComment("");
      setRating(1);
    }
  }, [ID, dispatch, product, success, userInfo, reviewError]);

  useEffect(()=>{
    dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    dispatch(getProduct(ID));
  },[dispatch,ID])

  const addToCartHandler = () => {
    Navigate({
      pathname: `/cart/${ID}`,
      search: `?qty=${qty}`,
    });
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productCreateReviewAction(ID, { rating, comment }));
  };

  return (
    <>
      <Button variant="light" className="my-3">
        <Link to="/">
          <i className="fa-solid fa-arrow-left fa-2xl"></i>
        </Link>
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient={"danger"} message={error} />
      ) : (
        product && (
          <>
            <Meta title={product.name} />
            <Row>
              <Col md={5}>
                <Image src={product?.image} alt={product?.name} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ overflow: "hide" }}>
                    <h3>{product?.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product?.rating}
                      text={`${product?.numReviews} Reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: &#8377;{product?.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Discription: {product?.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong style={{ fontWeight: "bold" }}>
                            &#x20B9; {product?.price}
                          </strong>{" "}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        {product?.countInStock > 0 ? (
                          <Col>
                            <strong style={{ fontWeight: "bold" }}>
                              In Stock
                            </strong>
                          </Col>
                        ) : (
                          <Col style={{ color: "red" }}>
                            <strong style={{ fontWeight: "bold" }}>
                              Out Of Stock
                            </strong>
                          </Col>
                        )}
                      </Row>
                    </ListGroup.Item>
                    {product && product?.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col md={6} sm={6} xs={6}>
                            Qty:
                          </Col>
                          <Col md={6} sm={6} xs={6}>
                            <Form.Control
                              style={{ padding: "0" }}
                              as={"select"}
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (e) => (
                                  <option key={e + 1}>{e + 1}</option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product?.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md="6">
                <h4>Reviews</h4>
                {Number(product?.reviews.length) === 0 ? (
                  <Message message={"No Reviews Yet"} />
                ) : (
                  <ListGroup
                    variant="flush"
                    style={{ height: "9rem", overflow: "auto" }}
                  >
                    {product?.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5>Write a Customer Review</h5>
                    {reviewError && (
                      <Message message={reviewError} varient={"danger"} />
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <FormGroup controlId="rating">
                          <Form.Label>
                            <strong>Rating</strong>
                          </Form.Label>
                          <NewRating setRating={setRating} rating={rating} />
                        </FormGroup>
                        <Form.Group controlId="comment">
                          <Form.Label>
                            <strong>Comment</strong>
                          </Form.Label>
                          <Form.Control
                            type="textarea"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="mt-3"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Alert variant="info">
                        Please{" "}
                        <Link
                          style={{ color: "blue", fontWeight: "bold" }}
                          to={"/login"}
                        >
                          Signin
                        </Link>{" "}
                        to write a review
                      </Alert>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
