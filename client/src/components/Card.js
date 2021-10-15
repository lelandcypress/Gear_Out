import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  let cardLink = "";

  switch (props.previous) {
    case "SEARCH":
      cardLink = `../items/${props.itemLink}`;
      break;
    case "HOME":
      cardLink = `/items/${props.itemLink}`;
      break;
    default:
      cardLink = `/`;
      break;
  }
  
  return (
    <>
      <div className="card costume-card">
        <Link to={cardLink}>
          <div className="card-body">
            <h3 className="card-title font-weight-bold mb-2">{props.name}</h3>
            <h4>{props.category}</h4>
          </div>
          <div className="d-flex justify-content-center">
            <img className="costume-img" src={`/images/${props.image}`} alt="" />
          </div>
          <div className="card-body">
            <h4>{props.shortDesc}</h4>

            {props.available ? <p>In Stock</p> : <p>Out of Stock</p>}

            <h4>${props.price}</h4>
            {props.rating ? <p>{props.rating.map((rating) => {})}</p> : null}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
