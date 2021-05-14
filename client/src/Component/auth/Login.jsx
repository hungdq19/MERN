import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContex";
import Notify from "../layout/Notify";
Login.propTypes = {};

function Login(props) {
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  // set up thong bao nguoi dung khi login
  const [alert, setAlert] = useState(null);
  const { username, password } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataLogin = await loginUser(form);
      if (dataLogin.success) {
        //Successfully .....
        setAlert({ type: "success", message: "Login thanh cong" });
      } else {
        setAlert({ type: "error", message: dataLogin.message });
        setTimeout(() => setAlert(null), 2000);
      }
    } catch (error) {}
  };
  return (
    <>
      <Form className="my-4" onSubmit={handleSubmit}>
        <Notify info={alert} />
        <Form.Group className="my-4">
          <Form.Control
            type="text"
            placeholder="UserName"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="PassWord"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className="my-3" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" className="ml-3">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default Login;
