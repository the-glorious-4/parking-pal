import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";

import Home from './pages/Home'

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  },
  uri: "/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <StoreProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route component={NoMatch} /> */}
              </Switch>
            </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
