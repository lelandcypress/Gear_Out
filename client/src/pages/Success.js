import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { idbPromise } from '../utils/helpers';
import { Redirect, useParams } from "react-router-dom";
// import { MUTATION_ADD_ORDER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth-client';
import { useQuery } from "@apollo/client";
import Cart from '../components/Cart';





function Success() {
    const id = useParams();
    console.log(id);
  // const [addOrder, { error }] = useMutation(MUTATION_ADD_ORDER);


    // useEffect(() => {
    //     async function saveOrder() {
    //         const token = Auth.loggedIn() ? Auth.getToken() : null;
    //         console.log(token);
    //         if (!token) {
    //             return false;
    //           }
    //           const decodedToken = Auth.getProfile(token).data._id;
    //           console.log(decodedToken);

    //       const cart = await idbPromise('cart', 'get');
    //       console.log("cart line 31: ", cart)
    //       const products = cart.map((item) => item._id);
    //           console.log("products line 33: ", products)
    //       if (products.length) {
    //         const { data } = await addOrder({ variables: { products },
    //          _id: decodedToken
    //         });
    //         const productData = data.addOrder.products;
    
    //         productData.forEach((item) => {
    //           idbPromise('cart', 'delete', item);
    //         });
    //       }
    
        //   setTimeout(() => {
        //     window.location.assign('/');
        //   }, 3000);
        // }
    
    //     saveOrder();
    //   }, [addOrder]);
//   setTimeout(() => {
//             window.location.assign('/');
//           }, 3000);
  return (
    <div>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
        <h2>Your order # is: {id.id} </h2>
    </div>
  );
}

export default Success;