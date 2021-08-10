import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { auth } from "../firebase";

import Login from "./Login";
import WeightApp from "./WeightApp";

function App() {
  const [isAuth, setAuth] = useState(null);

  useEffect(() => {
    var unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAuth === null ? null : isAuth === false ? (
            <Redirect to="/login" />
          ) : (
            <Redirect to="/weightapp" />
          )}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/weightapp">
          <WeightApp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
