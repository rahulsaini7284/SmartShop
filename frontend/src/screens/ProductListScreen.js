import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";
import { Loader } from "../Components/Loader";
import { Message } from "../Components/Message";
import { LinkContainer } from "react-router-bootstrap";
import {
  getProductsByAdmin,
  productDeleteAction,
} from "../redux/actions/productActions";
import Swal from "sweetalert2";
import { PRODUCT_DELETE_RESET } from "../redux/constants/productConstants";
import Paginate from "../Components/Pagination";
import { userDetailsAction } from "../redux/actions/userAction";
import Meta from "../Components/Meta";

const ProductsListScreen = () => {
  const pageNumber = useParams().pageNumber || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, error, loading, page, pages } = useSelector(
    (state) => state.adminProductsList
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.productDelete);

  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || pageNumber) {
      dispatch(getProductsByAdmin(pageNumber));
      if (success) {
        dispatch({ type: PRODUCT_DELETE_RESET });
        Swal.fire("Deleted!", "Product Deleted Successfully.", "success");
      }
    } else {
      navigate("/login");
    }
    if (error === "Session has expired Please Login First") {
      dispatch(userDetailsAction("profile"));
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, success, error, pageNumber]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(productDeleteAction(id));
      }
    });
  };
  let x=0;
  return (
    <>
      <Meta title={"Products List"} />
      <Row className="align-items-center">
        <Col>
          <h2>Products List</h2>
        </Col>
        <Col className="text-right">
          <LinkContainer to={"/admin/createProduct"}>
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} varient={"danger"} />
      ) : products&&(
        <>
          <Table responsive striped hover bordered className="table-sm">
            <thead>
              <tr>
                <th className="text-center">S No</th>
                <th className="text-center">ID</th>
                <th className="text-center">NAME</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">CATEGORY</th>
                <th className="text-center">BRAND</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="text-center">{x+=1}</td>
                  <td className="text-center">{product._id}</td>
                  <td className="text-center">{product.name}</td>
                  <td className="text-center">{product.price}</td>
                  <td className="text-center">{product.category}</td>
                  <td className="text-center">{product.brand}</td>

                  <td className="text-center">
                    <LinkContainer
                      to={`/admin/productEdit/${product._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i
                          className="fa-solid fa-pen-to-square fa-xl"
                          style={{ color: "#db8000" }}
                        ></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="light"
                      onClick={() => deleteHandler(product._id)}
                      className="btn-sm"
                    >
                      <i
                        className="fa-solid fa-trash fa-xl"
                        style={{ color: "#b30000" }}
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            page={page}
            pages={pages}
            isAdmin={true}
            component={"HomeScreen"}
          />
        </>
      )}
    </>
  );
};

export default ProductsListScreen;
