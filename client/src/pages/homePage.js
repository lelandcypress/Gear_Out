import Jumbotron from "../components/Jumbotron";
import Card from '../components/Card';
import { useQuery } from '@apollo/client';
import { QUERY_FEATURED_ITEMS } from '../utils/queries';
import Cart from "../components/Cart";
import React from "react";


function Homepage() {

  const { loading, data } = useQuery(QUERY_FEATURED_ITEMS);

  const results = data?.featuredItems || {};

  console.log(results);

  if (loading) {
      return (
          <>
            <Jumbotron />
            <Cart />
            <h2>Loading, please wait...</h2>
          </>
      );
  }

  return (
    <>
      <Jumbotron />
       <Cart />
      <ul>
        {results.map( (item) => {
          return (
            <li
                key={item._id}
            >
                <Card
                    previous={"HOME"}
                    itemLink={item._id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                />
            </li>
        );
        })}
      </ul>
    </>
  );
      }
export default Homepage;
