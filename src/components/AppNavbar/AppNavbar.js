import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

// Navbar
const AppNavbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const fullName = isAuthenticated
    ? JSON.parse(localStorage.userInfo).full_name
    : "";

  // links to be displayed when user is logged in
  const authLinks = (
    <>
      <Nav>
        <Nav.Link href="#deets">
          signed in as: <u>{fullName}</u>
        </Nav.Link>
        <Button
          variant="outline-success"
          onClick={(_) => {
            localStorage.setItem("token", false);
            localStorage.setItem("userInfo", "");

            setIsAuthenticated(false);
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Nav>
    </>
  );

  // links to be displayed when user is not logged in
  const guestLinks = (
    <Nav>
      <Link className="nav-link" to="/sign_up">
        Register
      </Link>
      <Link className="nav-link" to="/">
        Login
      </Link>
    </Nav>
  );
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Clocking App</Navbar.Brand>
        {isAuthenticated ? authLinks : guestLinks}
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
