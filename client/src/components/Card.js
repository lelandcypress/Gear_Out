import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ props }) => {

    return (
        <Link
            to={props.itemLink}
        >
            <div>
                <h3>{props.name}</h3>
                <img
                    src={props.image}
                    alt=''
                />
                <p>{props.shortDesc}</p>
                <p>{props.category}</p>

                {props.available ?
                    <p>In Stock</p>
                    :
                    <p>Out of Stock</p>
                }

                <h4>`$${props.price}`</h4>
                <p>{props.rating}</p>
            </div>
        </Link>
    );
}

export default Card;