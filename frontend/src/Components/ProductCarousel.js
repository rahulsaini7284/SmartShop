import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTopProducts } from "../redux/actions/productActions";
import { Loader } from "../Components/Loader";
import { Message } from "../Components/Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(
    (state) => state.productTopListed
  );
  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message message={error} varient={"danger"} />
  ) : (
    <Carousel
      interval="1500"
      prevLabel=""
      nextLabel=""
      pause="hover"
      className="bg-dark "
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div
              style={{
                textAlign: "center",
                marginTop: "5rem",
                marginBottom: "2rem",
              }}
            >
              {" "}
              <Image  src={product.image} alt={product.name} fluid />
            </div>
            <Carousel.Caption className="carousel-caption">
              <h2 >
                {product.name} (&#8377;{product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
