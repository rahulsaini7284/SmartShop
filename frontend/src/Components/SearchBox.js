import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeywod] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Form inline onSubmit={submitHandler} style={{ margin: "4px 0" }}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => {
              setKeywod(e.target.value);
            }}
            className="ml-sm-3 mr-sm-2 "
            placeholder="Search Products...... "
          ></Form.Control>
        </Col>
        <Col xs="auto">
          <Button type="submit" variant="outline-success" className="py-2">
            <i className="fas fa-search fa-lg"></i>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
