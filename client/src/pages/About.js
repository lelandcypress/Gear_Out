import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <Container>
      <Card className="my-5">
        <Card.Header className="h2">Our Mission</Card.Header>
        <Card.Body>
          <div>
            <p>Tired of cheap party city costumes? Us too!</p>
            <p>
              Gear-Out is your one stop shop for all your premium costume and
              cosplay needs.
            </p>
            <p>
              Rent a costume from one of our verified renters and enter the
              world of high-end costumery.
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
