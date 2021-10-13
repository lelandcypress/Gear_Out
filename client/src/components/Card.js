import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {

    let cardLink = '';

    switch(props.previous) {
        case "SEARCH":
            cardLink = `../items/${props.itemLink}`
            break;
        case "HOME":
            cardLink = `/items/${props.itemLink}`;
            break;
        default:
            cardLink = `/`
            break;
    }

    return (
        <Link
            to={cardLink}
        >
            <div>
                <h3>{props.name}</h3>
                <img
                    src={props.image}
                    alt=''
                />
                <p>{props.shortDesc}</p>
                <p>{props.category}</p>

                {props.available?
                    <p>In Stock</p>
                    :
                    <p>Out of Stock</p>
                }

                <h4>${props.price}</h4>
                {props.rating ?
                    <p>
                    {props.rating.map((rating) => {

                    })}
                    </p>
                    :
                    null
                }
            </div>
        </Link>
    );
}

export default Card;