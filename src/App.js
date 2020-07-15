import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/landingPage/LandingPage";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
