import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Components/Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="rounded p-3 my-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className="rounded"
          src={product.image}
          variant="top"
          style={{ width: "" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">&#8377; {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
