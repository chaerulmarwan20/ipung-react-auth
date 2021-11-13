import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { authContext } from "../../store";

export default function MenuMember() {
  const { dispatch } = useContext(authContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/dashboard" className="nav-link">
              Home
            </Link>
          </Nav>
          <Navbar.Text>
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "LOGOUT",
                })
              }
            >
              Logout
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
