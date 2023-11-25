import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Components/Product";
import { Col, Row } from "react-bootstrap";
import { getProducts } from "../redux/actions/productActions";
import { Loader } from "../Components/Loader";
import { Message } from "../Components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../Components/Pagination";
import Meta from "../Components/Meta";
import ProductCarousel from "../Components/ProductCarousel";

const HomeScreen = () => {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, pages, page, error } = productList;
  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/">
          {" "}
          <i className="fa-solid fa-arrow-left fa-2xl"></i>
        </Link>
      )}
      <h1>Latest Products</h1>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient={"danger"} message={error} />
        ) : (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product key={product._id} product={product} />
            </Col>
          ))
        )}
      </Row>
      <Paginate
        pages={pages}
        page={page}
        keyword={keyword ? keyword : ""}
        component={"HomeScreen"}
      />
    </>
  );
};

export default HomeScreen;
