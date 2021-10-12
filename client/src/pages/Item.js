import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  MUTATION_ADD_ITEM_TO_ORDER,
  MUTATION_TOGGLE_AVAILABILITY,
} from "../utils/mutations";
import { QUERY_SINGLE_ITEM } from "../utils/queries";
import { Redirect, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/badge";

const Item = () => {
  const id = useParams();

  console.log(id);

  const { loading, data } = useQuery(QUERY_SINGLE_ITEM, {
    variables: { _id: id.id },
  });

  const [addItemToOrder, { error }] = useMutation(MUTATION_ADD_ITEM_TO_ORDER);
  const [toggleAvailability] = useMutation(MUTATION_TOGGLE_AVAILABILITY);
  //const [availability, setAvailability] = useState("");

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
   };
  
  // eslint-disable-next-line no-lone-blocks
  const item = data.getOneItem;
  
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
              <Button variant="secondary">Unavailable</Button>
            )}
          </Card>
        </Col>
        <Col>
          <Card border="dark">
            <Card.Header>Description</Card.Header>

            <Card.Body>{item.longDescription}</Card.Body>
            {/*allows for multiple ratings per item*/}
            {/* <Stack gap={2}>
              <div className="border">
                <p>User Reviews</p>
                {console.log("!!!!!!!!!!!!!!!!!ITEM RATING =",item.rating)}
                {item.rating.map((rating) => {
                  return (
                    <>
                      <div>{rating.rating} out of 5 Stars</div>
                      <div>{rating.comment}</div>
                    </>
                  );
                })}
              </div>
              </Stack>*/}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Item;
