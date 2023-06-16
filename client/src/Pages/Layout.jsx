import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Layout() {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to={"/"}>Chat App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={"/"} as={NavLink}>
              Login
            </Nav.Link>
            <Nav.Link to={"/register"} as={NavLink}>
              Register
            </Nav.Link>
            <Nav.Link to={"/chat"} as={NavLink}>
              Send A Message
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Button onClick={logout}>Logout</Button>
      </Container>
    </Navbar>
  );
}

export default Layout;
