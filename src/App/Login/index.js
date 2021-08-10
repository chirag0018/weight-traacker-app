import React, { useEffect, useState } from "react";
import "./index.css";
import { auth } from "../../firebase";
import { Redirect } from "react-router-dom";

import logo from "./logo.png";

function Login() {
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

  const signin = () => {
    auth
      .signInAnonymously()
      .then((res) => {
        setAuth(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isAuth === null) {
    return null;
  }

  if (isAuth === true) {
    return <Redirect to="/weightapp" />;
  }

  return (
    <div className="main">
      <div className="imagePanel">
        <img src={logo} alt="" />
      </div>

      <div className="loginPanel">
        <h2 className="appName">Weight Tracker App</h2>

        <div className="loginDiv">
          <button onClick={signin} className="loginBtn">
            Login Anonymously
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
