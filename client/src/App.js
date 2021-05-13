import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./pages/Home";
import CheckoutForm from "./components/CheckoutForm";

// TODO: replace this test key with prod key and store securely
const promise = loadStripe(
  "pk_test_51InyxjLzbTTaQxk5EdjCWbj0CjXJoh7lPICpUdwvL8JhnLxqldfzi81FoyJVB8Hli3eUEgB2bTjcPy2iyglLsAQi006PhzzGwf"
);

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Elements stripe={promise}>
            <Route exact path="/checkout" component={CheckoutForm} />
          </Elements>
          {/* <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
