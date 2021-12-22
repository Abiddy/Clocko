import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

/**
 * 
 * @param {props.setIsAuthenticated} - function to set authenticated user 
 *  @param {props.isAuthenticated} - check if user is authenticated 
 * @returns 
 */
function Login({ setIsAuthenticated, isAuthenticated }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  // post request to check if user exists and login
  const submitUser = () => {
    Axios.post("http://localhost:3000/api/user/login", {
      password: password,
      email: email,
    }).then((res) => {
      localStorage.setItem("token", true);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setIsAuthenticated(true);
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="pb-2">Login</h2>
      <Form>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitUser}>
          Log In
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
