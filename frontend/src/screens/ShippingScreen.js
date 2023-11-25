import React, { useState } from "react";
import FormContainer from "../Components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";
import { saveShippingAddressAction } from "../redux/actions/cartAction";
import CheckoutSteps from "../Components/CheckoutSteps";
import Meta from "../Components/Meta";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [country, setCountry] = useState(shippingAddress.country);
  const [state, setState] = useState(shippingAddress.state);
  const [district, setDistrict] = useState(shippingAddress.district);
  const [pincode, setPincode] = useState(shippingAddress.pincode);
  const [city, setCity] = useState(shippingAddress.city);
  const [landmark, setLandmark] = useState(shippingAddress.landmark);
  const [mobileNumber, setMobileNumber] = useState(
    shippingAddress.mobileNumber
  );
  const [alternateNumber, setAlternateNumber] = useState(
    shippingAddress.alternateNumber
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(
        saveShippingAddressAction({
          country,
          state,
          district,
          city,
          pincode,
          landmark,
          mobileNumber,
          alternateNumber,
        })
      );
      navigate("/payment");
    }
  };
  return (
    <>
      <Meta title={"Shipping"} />
      <CheckoutSteps step1 step2 />
      <hr />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              placeholder="Enter Country"
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              placeholder="Enter State"
              type="text"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter District"
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="pincode">
            <Form.Label>PinCode</Form.Label>
            <Form.Control
              placeholder="Enter Pincode"
              type="number"
              required
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="Enter City"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="landmark">
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              placeholder="Enter Landmark"
              type="text"
              required
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="Mobile Number">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              placeholder="Enter Mobile Number"
              type="number"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(Number(e.target.value))}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="Alternate Number">
            <Form.Label>Alternate Number</Form.Label>
            <Form.Control
              placeholder="Enter Alternate Number"
              type="number"
              required
              value={alternateNumber}
              onChange={(e) => setAlternateNumber(Number(e.target.value))}
            ></Form.Control>
          </FormGroup>
          <Button className="mt-3" variant="primary" type="submit">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
