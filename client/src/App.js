import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";
import Auth from "./utils/auth";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import NoMatch from "./pages/NoMatch";
import ParkingPlace from "./pages/ParkingPlace";
import SuccessfulReservation from "./pages/SuccessfulReservation";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Switch>
              <Route exact path="/" component={Home}>
                {Auth.loggedIn() ? <Redirect to="/dashboard" /> : null}
              </Route>
              <Route exact path="/dashboard" component={Dashboard}>
                {!Auth.loggedIn() ? <Redirect to="/" /> : null}
              </Route>
              <Route exact path="/history" component={History}>
                {!Auth.loggedIn() ? <Redirect to="/" /> : null}
              </Route>
              <Route exact path="/parking-place" component={ParkingPlace}>
                {!Auth.loggedIn() ? <Redirect to="/" /> : null}
              </Route>
              <Route exact path="/success" component={SuccessfulReservation}>
                {!Auth.loggedIn() ? <Redirect to="/" /> : null}
              </Route>
              {/* <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} /> */}
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
