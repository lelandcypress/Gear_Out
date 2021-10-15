import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth-client";

function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="w-100">
          <Navbar.Brand as={Link} to="/">
            Find Your Gear!
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Form className="d-flex w-100">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                }}
              />
              <Nav.Link as={Link} to={`/search/${searchQuery}`}>
                <Button
                  variant="outline-primary"
                  onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  Search
                </Button>
              </Nav.Link>
            </Form>

            <Nav>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login/Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Container className="row">
              <Nav justify defaultActiveKey="/home">
                <Nav.Item>
                  <Nav.Link as={Link} to="/search/Superhero">
                    Superhero
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/search/Fantasy" eventKey="link-1">
                    Fantasy
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/search/Star Wars" eventKey="link-2">
                    Star Wars
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/search/Video Games"
                    eventKey="link-3"
                  >
                    Video Games
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/search/Power Rangers"
                    eventKey="link-2"
                  >
                    Power Rangers
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
