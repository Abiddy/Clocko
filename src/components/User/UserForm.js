import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

/**
 * 
 * @returns User Form component to allow users to register 
 */
function UserForm() {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const submitUser = () => {
    // post request to create user
    Axios.post("/api/user/user_create", {
      fullname: fullname,
      password: password,
      email: email,
    }).then(() => {
      navigate('/')
    });
  };
  return (
    <Container className="mt-4">
      <h2 className="pb-2">Register</h2>
      <Form>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </Form.Group>
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
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default UserForm;
