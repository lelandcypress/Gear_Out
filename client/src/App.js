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
import "bootstrap/dist/css/bootstrap.min.css";
// Import Header and Footer
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Item from "./pages/Item";
import Homepage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import { StoreProvider } from "./utils/GlobalState";
import LoginSignup from "./pages/LoginSignup";
import UserProfile from "./pages/User";
import Cart from "./components/Cart";
import Contact from "./pages/Contact";

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
          <StoreProvider>
            <Navigation />
            <Cart />
            <Switch>
              <Route exact path="/" component={Homepage} />

              <Route exact path="/search/:query" component={SearchResults} />
              <Route exact path="/items/:id" component={Item} />
              <Route exact path="/login" component={LoginSignup} />
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/contact" component={Contact} />

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
          </StoreProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
