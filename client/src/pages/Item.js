import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_ITEM } from "../utils/queries";

const Item = ({ props }) => {
  const { itemId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_ITEM, {
    variables: { _id: itemId },
  });
  const product = data?._id || {};
  if (loading) {
    return (
      <>
        <h2>Hang Tight...getting your costume ready</h2>
      </>
    );
  }

  return (
    <div>
      {product.map((item) => {
        return (
          <>
            <div>
              image={item.image}
              name={item.name}
              shortDesc={item.shortDescription}
              available={item.available}
              price={item.price}
              rating={item.rating}
            </div>
            <div>item.longDescription</div>
          </>
        );
      })}
    </div>
  );
};
export default Item;
