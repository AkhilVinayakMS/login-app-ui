import React, { useState, useEffect, Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { getLoggedInUser } from "./services/authentication.service";
import Signup from "./components/Signup/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import Profile from "./components/Profile/Profile";
import "./App.css";
import { useHistory } from "react-router-dom";
function App() {
  const [loggedinUser, setloggedinUser] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      setisLoggedIn(true);
      setloggedinUser(user);
      history.push("/profile");
    }
  }, []);
  return (
      <Fragment>
        <Switch>
          <Route exact path={["/", "/login"]} component={LoginForm} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Fragment>
  );
}

export default App;
