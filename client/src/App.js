import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";

import Home from './pages/Home'


function App() {
  return (
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
  );
}

export default App;
