import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { QUERY_FEATURED_ITEMS } from "../utils/queries";
import React from "react";
import Fade from "react-reveal/Fade";

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
    <div className="pb-5">
      <Jumbotron />
      <div className="container">
        <div className="text-center">
          <h2 className="m-4">Looking for a costume for a convention?</h2>
          <h2 className="m-4">Or maybe a halloween party?</h2>
          <h2 className="m-4">Even just for your own enjoyment?</h2>
          <h2 className="m-4">
            Gear-Out is your one stop costume shop for all your creative needs.
          </h2>
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="row">
          {results.map((item) => {
            return (
              <Fade left>
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
              </Fade>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Homepage;
