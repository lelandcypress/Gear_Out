import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";

const Footer = () => {
  return (
    <div className="mt-3 fixed-bottom">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="mx-auto">
            <NavbarBrand>© 2021</NavbarBrand>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
