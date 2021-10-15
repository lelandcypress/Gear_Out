import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { idbPromise } from '../utils/helpers';
import { Redirect, useParams } from "react-router-dom";
import { MUTATION_ADD_ORDER } from "../utils/mutations";
import { useMutation } from "@apollo/client";




function Success() {
    const id = useParams();
  const [addOrder] = useMutation(MUTATION_ADD_ORDER);


  
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const items = cart.map((item) => item._id);

      if (items.length) {
        const { data } = await addOrder( {
            variables: { order: id },
          });
        const itemData = data.addOrder.items;

        itemData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 10000);
    }

    saveOrder();
  }, [id]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
        <h2>Your order number is: {id}!</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;