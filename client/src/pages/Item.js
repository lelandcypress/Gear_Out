import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_ITEM } from "../utils/queries";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useStoreContext } from "../utils/GlobalState";
import { idbPromise } from "../utils/helpers";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import "./Item.css";

const Item = () => {
  const [state, dispatch] = useStoreContext();
  const id = useParams();
  const [item, setItem] = useState(null);
  const { loading, data } = useQuery(QUERY_SINGLE_ITEM, {
    variables: { _id: id.id },
  });
  const { cart } = state;

  useEffect(() => {
    if (data !== undefined) {
      setItem(data.getOneItem);
    }
  }, [data, loading]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id._id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id._id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        item: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  const loadComponent = () => {
    return (
      <>
        <h2>Hang Tight...getting your costume ready</h2>
      </>
    );
  };

  return (
    <Container className="mt-3 mb-5">
      {!loading && item !== null ? (
        <Row>
          <Col>
            <Card className="mb-5 item-shadow">
              <Card.Header>
                <h2>{item.name}</h2>
              </Card.Header>
              <Image src={`/images/${item.image}`} fluid />
              <Card.Body>
                <Card.Text>
                  Carried By:{item.vendor} {item.location}
                </Card.Text>
                Price: ${item.price}
              </Card.Body>
              {item.available ? (
                <Button className="mb-2" variant="info" onClick={addToCart}>
                  Reserve It Now
                </Button>
              ) : (
                <Button className="mb-2" variant="secondary">
                  Unavailable
                </Button>
              )}
            </Card>
          </Col>
          <Col>
            <Card className="item-shadow">
              <Card.Header>
                <h2>Description</h2>
              </Card.Header>
              <Card.Body>{item.longDescription}</Card.Body>
            </Card>
            <Card className="mt-4 item-shadow">
              <div>
                <div className="border w-100">
                  <Card.Header>
                    <h2>User Reviews</h2>
                  </Card.Header>

                  {Array.isArray(item.rating) && item.rating.length > 0
                    ? item.rating.map((rating, index) => {
                        return (
                          <div className="p-3" key={index}>
                            <h4>{rating.rating} out of 5 Stars</h4>
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
