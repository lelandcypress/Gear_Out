import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  MUTATION_RETURN_ITEM,
  MUTATION_TOGGLE_AVAILABILITY,
} from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/badge";

const User = ({ props }) => {
  const [loading, data] = useQuery(QUERY_ME);
  const [returnItem, { error }] = useMutation(MUTATION_RETURN_ITEM);
  const [toggleAvailability] = useMutation(MUTATION_TOGGLE_AVAILABILITY);

  const profile = data?.email || {};
  if (loading) {
    return (
      <>
        <h2>Fetching your profile</h2>
      </>
    );
  }
  const handleReturn = async (e) => {
    e.preventDefault();
    await returnItem;
    await toggleAvailability;
  };
  profile.map((me) => {
    return (
      <Row>
        <Col>
          <Card border="dark">
            <Card.Header>
              <h3>PROFILE</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <div>Username:{me.username}</div>
                <div>Email: {me.email}</div>
              </Card.Text>
            </Card.Body>
            <Stack gap={2}>
              <div className="border">
                <p>User Reviews</p>
                <div>5 out of 5 Stars</div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </Stack>
          </Card>
        </Col>
        <Col>
          <Card border="dark">
            <Card.Header>
              <h3>Orders</h3>{" "}
            </Card.Header>

            {me.orders.map((order) => {
              return (
                <Card.Body>
                  <Card.Text border="dark">
                    <p>{order.items.name}</p>
                    <p>Rental Start:{order.startDate}</p>
                    <p>Due Back:{order.endDate}</p>
                    <Button>Return</Button>
                  </Card.Text>
                </Card.Body>
              );
            })}
          </Card>
        </Col>
      </Row>
    );
  });
};

export default User;
