import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function MenuPublic() {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Navbar.Text>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
