import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  MUTATION_ADD_ITEM_TO_ORDER,
  MUTATION_TOGGLE_AVAILABILITY,
} from "../utils/mutations";
import { QUERY_SINGLE_ITEM } from "../utils/queries";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/badge";

const Item = ({ props }) => {
  const [loading, data] = useQuery(QUERY_SINGLE_ITEM);
  const [addItemToOrder, { error }] = useMutation(MUTATION_ADD_ITEM_TO_ORDER);
  const [toggleAvailability] = useMutation(MUTATION_TOGGLE_AVAILABILITY);
  //const [availability, setAvailability] = useState("");

  const item = data?._id || {};
  if (loading) {
    return (
      <>
        <h2>Hang Tight...getting your costume ready</h2>
      </>
    );
  }
  const handleOrder = async (e) => {
    e.preventDefault();
    await addItemToOrder;
    await toggleAvailability;
  };

  // eslint-disable-next-line no-lone-blocks

  return (
    <Container>
      <Row>
        <Col>
          <Card border="dark">
            <Card.Header>
              <h3>{item.name}</h3>
              {/*Conditional rendering for availability, not sure if we need a state hook here, or if GraphQL will manage*/}
              <h5>
                <Badge bg="secondary">
                  {item.available ? "In Stock" : "Out of Stock"}
                </Badge>
              </h5>
            </Card.Header>
            <Image src={item.image} fluid />
            <Card.Body>
              <Card.Text>
                Carried By:{item.vendor} {item.location}
              </Card.Text>
              <div>Price: ${item.price}</div>
            </Card.Body>
            {item.available ? (
              <Button variant="primary" onClick={handleOrder}>
                Reserve It Now
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Unavailable
              </Button>
            )}
          </Card>
        </Col>
        <Col>
          <Card border="dark">
            <Card.Header>Description</Card.Header>

            <Card.Body>{item.longDescription}</Card.Body>
            {/*allows for multiple ratings per item*/}
            <Stack gap={2}>
              <div className="border">
                <p>User Reviews</p>
                {item.rating.map((rating) => {
                  return (
                    <>
                      <div>{rating.rating} out of 5 Stars</div>
                      <div>{rating.comment}</div>
                    </>
                  );
                })}
              </div>
            </Stack>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Item;
