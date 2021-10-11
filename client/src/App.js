import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// Import Header and Footer
import Footer from "./components/Footer";
import Item from "./pages/Item";
import homePage from "./pages/homePage";
import SearchResults from "./pages/searchResults";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
