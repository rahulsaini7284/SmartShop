import React, { useState, useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { Message } from "../Components/Message";
import {
  getProduct,
  productCreateAction,
  productUpdateAction,
} from "../redux/actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../redux/constants/productConstants";
import Swal from "sweetalert2";
import Meta from "../Components/Meta";
import axios from "axios";

const ProductUpdateScreen = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("CREATE");
  const ID = useParams().id;
  const [data, setData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    countInStock: "",
    image: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { product, error, loading } = useSelector((state) => state.product);
  const {
    success: createProductSuccess,
    error: CreateProductError,
    loading: createProductLoading,
  } = useSelector((state) => state.productCreate);
  const {
    success,
    error: updateError,
    loading: updateLoading,
  } = useSelector((state) => state.productUpdate);

  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data: uploadData } = await axios.post(
        "/api/upload",
        formData,
        config
      );
      setData({ ...data, image: uploadData });
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (mode === "UPDATE" && data) {
      dispatch(productUpdateAction(data, ID));
    } else if (mode === "CREATE" && data) {
      dispatch(productCreateAction(data));
    }
  };
  useEffect(() => {
    if (!ID) {
      setMode("CREATE");
    } else {
      setMode("UPDATE");
    }
  }, [ID]);
  useEffect(() => {
    if (createProductSuccess) {
      Swal.fire("Created!", "Product Created Successfully.", "success");
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate("/admin/productsList");
    } else {
      if (success) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        navigate("/admin/productsList");
      } else if (mode === "UPDATE") {
        if (product?._id !== ID) {
          console.log(mode);
          dispatch(getProduct(ID));
        } else {
          setData({
            name: product?.name || "",
            price: product?.price || "",
            brand: product?.brand || "",
            category: product?.category || "",
            countInStock: product?.countInStock || "",
            image: product?.image || "",
            description: product?.description || "",
          });
        }
      }
    }
  }, [
    dispatch,
    product,
    ID,
    success,
    mode,
    navigate,
    CreateProductError,
    createProductSuccess,
  ]);
  return (
    <>
      {mode === "CREATE" ? (
        <Meta title={"Craete Product"} />
      ) : (
        <Meta title={"Update Product"} />
      )}
      <Button variant="light" className="mr-2">
        <Link to={"/admin/productsList"}>
          <i className="fa-solid fa-arrow-left fa-2xl"></i>
        </Link>
      </Button>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateError && <Message message={updateError} varient={"danger"} />}
        {error ? (
          <Message message={error} varient={"danger"} />
        ) : loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={data?.name}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price"
                value={data?.price}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="image">
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="file"
                name="image"
                placeholder="Choose File"
                onChange={imageUploadHandler}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Enter Brand"
                value={data?.brand}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                name="countInStock"
                placeholder="Enter count In Stock"
                value={data?.countInStock}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter Category"
                value={data?.category}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter Description"
                value={data?.description}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              ></Form.Control>
            </FormGroup>
            <div>
              <div style={{ width: "75" }}>
                {" "}
                <Button
                  className=" my-3 w-50"
                  disabled={updateLoading}
                  variant="dark"
                  type="submit"
                >
                  {mode === "UPDATE" ? (
                    updateLoading
                  ) : createProductLoading ? (
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
                  ) : mode === "CREATE" ? (
                    "Create Product"
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

export default ProductUpdateScreen;
