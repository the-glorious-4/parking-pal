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
// import History from "./pages/History";
import NoMatch from "./pages/NoMatch";
import Checkout from "./pages/Checkout";
import SuccessfulReservation from "./pages/SuccessfulReservation";
import FindASpot from "./pages/FindASpot";
import AddASpot from "./pages/AddASpot";
import MySpots from "./pages/MySpots";

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
              <Route exact path="/" component={Home}></Route>

              <Route exact path="/dashboard" component={Dashboard}></Route>

              <Route exact path="/addparking" component={AddASpot}></Route>

              <Route exact path="/myspots" component={MySpots}></Route>

              {/* <Route exact path="/history" component={History}>
                {!Auth.loggedIn() ? <Redirect to="/" /> : null}
              </Route> */}

              <Route exact path="/checkout" component={Checkout}></Route>

              <Route exact path="/success" component={SuccessfulReservation}></Route>

              <Route exact path="/findparking" component={FindASpot}></Route>

              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
