import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import withLogin from "../auth/withLogin";
import { api } from "../lib/api";
import Game from "../components/Game";
import SideBar from "../components/Sidebar";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c5c5c5;
  background: hsl(210, 25%, 8%);
`;


function Home() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const init = async () => {
    try {
      const data = await api.init();
      setLocation(data);
      setName(data.name);
    } catch (err) {
      localStorage.removeItem("token");
      setLoggedIn(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (!location) {
    return <Container>Loading</Container>;
  }

  if (!loggedIn) {
    return <Redirect to="login" />;
  }

  return (
    <Container>

      <SideBar name={name} location={location} logOut={logOut} />

      <Game location={location} setLocation={setLocation} />
    </Container>
  );
}

export default withLogin(Home);
