import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

Register.propTypes = {};

function Register(props) {
  return (
    <>
      <Form className="my-4">
        <Form.Group className="my-4">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Control
            type="text"
            placeholder="UserName"
            name="username"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="PassWord"
            name="password"
            required
          />
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Control
            type="text"
            placeholder="Nhập lại PassWord"
            name="comfirm password"
            required
          />
        </Form.Group>
        <Button className="my-3" variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/login">
          <Button variant="info" className="ml-3">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default Register;
