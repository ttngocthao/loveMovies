import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useRecoilState } from "recoil";
import { globalAuthState } from "./index";

import ProtectedRoute from "./components/routing/ProtectedRoute";
import LandingPage from "./components/views/landingPage/LandingPage";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import Home from "./components/views/Home";
import Dashboard from "./components/views/dashboard/Dashboard";
import AddMovieForm from "./components/movies/AddMovieForm";

function App() {
  const [appLoading, setAppLoading] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(globalAuthState);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user exists", user);
        setCurrentUser({ userId: user.uid, email: user.email });
        setAppLoading(true);
      } else {
        console.log("no user found");
        setAppLoading(true);
      }
    });
  }, [setCurrentUser]);
  const signOutHandle = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
    });
  };
  return (
    <Router>
      {appLoading && (
        <div className="App">
          {currentUser && currentUser.userId && (
            <button onClick={signOutHandle}>Log out</button>
          )}
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
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/add-movie" component={AddMovieForm} />
          </Switch>
        </div>
      )}
    </Router>
  );
}

export default App;
