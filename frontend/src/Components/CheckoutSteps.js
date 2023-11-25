import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-2">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to={"/login"}>
            <Nav.Link>
              <strong style={{ fontWeight: "bold" }}>Sign In</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link>
            <strong style={{ fontWeight: "bold" }}>Sign In</strong>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to={"/shipping"}>
            <Nav.Link>
              <strong style={{ fontWeight: "bold" }}>Shipping</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong style={{ fontWeight: "bold" }}>Shipping</strong>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to={"/payment"}>
            <Nav.Link>
              <strong style={{ fontWeight: "bold" }}>Payment</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong style={{ fontWeight: "bold" }}>Payment</strong>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to={"/placeOrder"}>
            <Nav.Link>
              <strong style={{ fontWeight: "bold" }}>Place Order</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong style={{ fontWeight: "bold" }}>Place Order</strong>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
