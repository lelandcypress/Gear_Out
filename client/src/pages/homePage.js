import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { QUERY_FEATURED_ITEMS } from "../utils/queries";
import React from "react";

function Homepage() {
  const { loading, data } = useQuery(QUERY_FEATURED_ITEMS);

  const results = data?.featuredItems || {};

  console.log(results);

  if (loading) {
    return (
      <>
        <Jumbotron />
        <h2>Loading, please wait...</h2>
      </>
    );
  }

  return (
    <>
      <Jumbotron />
      {/* <ul> */}
      <div class="container-fluid text-center">
        <div className="row">
          {results.map((item) => {
            return (
              <div className="col-lg-4 mx-auto mb-4" key={item._id}>
                <Card
                  previous={"HOME"}
                  itemLink={item._id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  available={item.available}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* </ul> */}
    </>
  );
}
export default Homepage;
