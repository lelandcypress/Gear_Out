import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { MUTATION_RETURN_ITEM, MUTATION_TOGGLE_AVAILABILITY } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth-client";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./User.css";


const UserProfile = () => {
  const [returnItem] = useMutation(MUTATION_RETURN_ITEM);
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
        <Card border="dark">
          <Card.Header>
            <h3>Profile</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>Username: {user.username}</Card.Text>
            <Card.Text>Email: {user.email}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="m-3 profile-shadow">
          <div className="border">
            <Card.Header>
              <h3>User Reviews</h3>
            </Card.Header>
            <div className="m-3">
              <Card.Text>5 out of 5 Stars</Card.Text>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Text>
            </div>
          </div>
        </Card>
      </Col>
      <Col>
        <Card border="dark">
          <Card.Header>
            <h3>Orders</h3>{" "}
          </Card.Header>
          {user.orders ? (
            <>
              {user.orders.map((order) => {
                return (
                  <Card.Body key={order._id}>
                    <p>Rental Start:{order.startDate}</p>
                    <p>Due Back:{order.endDate}</p>
                    {order.items.map((item) => (
                      <p key={item._id}>{item.name}</p>
                    ))}
                      {order.items.map((item) => (
                        <p>{item.name}</p>
                      ))}

                      <Button onClick={handleReturn}>Return</Button>
                    </Card.Body>
                  );
                })}
              </>
            ) : null}
          </Card>
        </Col>
      </Row>
  );
 
};


export default UserProfile;
