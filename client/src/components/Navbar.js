import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LinkContainer from 'react-router-bootstrap';
import { useState } from 'react';

function Navigation() {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Gear-Out!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Should We Have</Nav.Link>
            <Nav.Link href="#pricing">Something Here?</Nav.Link>
            <NavDropdown title="Featured Searches" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Search 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Search 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Search 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(value) => {
                setSearchQuery(value);
              }}
            />
            <LinkContainer to={`/search/${searchQuery}`}>
              <Button
                variant="outline-success"
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >Search</Button>
            </LinkContainer>
          </Form>
          <Nav>
            <Nav.Link href="#deets">Login</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
