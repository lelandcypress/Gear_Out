import React, { useState, useEffect } from "react";
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
  const [item, setItem] = useState(null);
  const { loading, data } = useQuery(QUERY_SINGLE_ITEM, {
    variables: { _id: id.id },
  });
  useEffect(() => {
    if (data !== undefined) {
      setItem(data.getOneItem);
    }
  }, [data, loading]);
  const [addItemToOrder, { error }] = useMutation(MUTATION_ADD_ITEM_TO_ORDER);
  const [toggleAvailability] = useMutation(MUTATION_TOGGLE_AVAILABILITY);
  const loadComponent = () => {
    return (
      <>
        <h2>Hang Tight...getting your costume ready</h2>
      </>
    );
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    await addItemToOrder;
  };

  return (
    <Container>
      {!loading && item !== null ? (
        <Row>
          <Col>
            <Card border="dark">
              <Card.Header>
                <h3>{item.name}</h3>

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
              <div className="stack-wrapper">
                <div className="border custom-stack">
                  <p>User Reviews</p>

                  {Array.isArray(item.rating) && item.rating.length > 0
                    ? item.rating.map((rating, index) => {
                        return (
                          <div key={index}>
                            <div>{rating.rating} out of 5 Stars</div>
                            <div>{rating.comment}</div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ) : (
        loadComponent()
      )}
    </Container>
  );
};

export default Item;
