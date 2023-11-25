import React, { useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import FormContainer from "../Components/FormContainer";
import { Form, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethodAction } from "../redux/actions/cartAction";
import Meta from "../Components/Meta";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      dispatch(savePaymentMethodAction(paymentMethod));
      navigate("/placeOrder");
    }
  };
  return (
    <>
      <Meta title={"Payment"} />
      <CheckoutSteps step1 step2 step3 />
      <hr />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                value="paypal"
                label="Paypal and Credit Card"
                name="paymentMethod"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
