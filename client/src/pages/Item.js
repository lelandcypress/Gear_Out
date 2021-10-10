import React from "react";
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

  const product = data?._id || {};
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
  {
    product.map((item) => {
      return (
        <Container>
          <Row>
            <Col>
              <Card border="dark">
                <Card.Header>
                  <h3>{item.name}</h3>
                  <h5>
                    <Badge bg="success">{item.available}</Badge>
                  </h5>
                </Card.Header>
                <Image src={item.image} fluid />
                <Card.Body>
                  <Card.Text>
                    Carried By:{item.vendor} {item.location}
                  </Card.Text>
                  <div>Price: ${item.price}</div>
                </Card.Body>
                <Button variant="primary" onClick={handleOrder}>
                  Reserve It Now
                </Button>{" "}
              </Card>
            </Col>
            <Col>
              <Card border="dark">
                <Card.Header>Description</Card.Header>

                <Card.Body>{item.longDescription}</Card.Body>

                <Stack gap={2}>
                  <div className="border">
                    <p>User Reviews</p>
                    <div>5 out of 5 Stars</div>
                    <div>Fought many bad guys, would wear again</div>
                  </div>
                </Stack>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    });
  }
};

export default Item;
