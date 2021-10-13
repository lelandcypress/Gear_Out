import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import "./App.css";
import { setContext } from "@apollo/client/link/context";
// Import Header and Footer
import Footer from "./components/Footer";
import Item from "./pages/Item";
import homePage from "./pages/homePage";
import SearchResults from "./pages/searchResults";

// This is just a terrible bandaid. We'll need to figure out
// WHY the ApolloClient link thinks it needs to point to
// http://localhost:3000/graphql
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// ** Need to reincorporate AuthLink later
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache(),
});

// console.log("HTTPLINK", httpLink);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path="/" component={homePage} />
            <Route exact path="/search/:query" component={SearchResults} />
            <Route exact path="/items/:id" component={Item} />
            <Route
              exact
              path="/cart/"
              component={
                {
                  /* Shopping Cart Page */
                }
              }
            />
            {/* If path incorrect/ nonexistent item, show 404 page */}
            <Route render={() => <h1>404: Not Found</h1>} />
          </Switch>

          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
