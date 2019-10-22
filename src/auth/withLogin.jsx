import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function withLogin(Component) {
  return function WithLogin(props) {
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
      const token = window.localStorage.getItem("token");
 
      if (token) {
        return;
      }

      return setLoggedIn(false);
    }, []);

    if (!loggedIn) {
      return <Redirect to="login" />;
    }

    return <Component {...props}></Component>;
  };
}

export default withLogin;
