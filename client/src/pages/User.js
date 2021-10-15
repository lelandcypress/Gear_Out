// import React from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth-client";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  MUTATION_RETURN_ITEM,
  MUTATION_TOGGLE_AVAILABILITY,
} from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./User.css";

const UserProfile = (props) => {
  const [returnItem, { error }] = useMutation(MUTATION_RETURN_ITEM);
  const [toggleAvailability] = useMutation(MUTATION_TOGGLE_AVAILABILITY);
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};

  // If you aren't logged in, go to home
  if (!Auth.loggedIn()) {
    return <Redirect to="/" />;
  }

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

  return (
    <Row>
      <Col>
        <Card className="m-3 profile-shadow">
          <Card.Header>
            <h3>Profile</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>Username: {user.username}</Card.Text>
            <Card.Text>Email: {user.email}</Card.Text>
          </Card.Body>
          <div className="border custom-stack">
            <p>User Reviews</p>
            <div>5 out of 5 Stars</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </Card>
      </Col>
      <Col>
        <Card className="m-3 profile-shadow">
          <Card.Header>
            <h3>Orders</h3>{" "}
          </Card.Header>
          {user.orders ? (
            <>
              {user.orders.map((order) => {
                return (
                  <Card.Body>
                    <p>Rental Start:{order.startDate}</p>
                    <p>Due Back:{order.endDate}</p>

                    {order.items.map((item) => (
                      <p>{item.name}</p>
                    ))}

                    <Button onClick={handleReturn}>Return</Button>
                  </Card.Body>
                );
              })}
            </>
          ) : null}

          <Button onClick={handleReturn}>Return</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default UserProfile;
