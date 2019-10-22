import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import withLogin from "../auth/withLogin";
import { api } from "../lib/api";
import Game from "../components/Game";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c5c5c5;
  background: hsl(210, 25%, 8%);
`;

const Header = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  padding: 0 15px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    height: 40px;
    width: 80px;
    background: none;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    color: #c5c5c5;
    cursor: pointer;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  border-radius: 50%;
  background: #c5c5c5;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Players = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  padding: 0 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: left;

  h3 {
    margin: 5px 0;
  }

  p {
    margin: 5px 0;
  }

`;

function Home() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const init = async () => {
    try {
      const data = await api.init();
      console.log(data)
      setLocation(data);
      setName(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
  };

  useEffect(() => {
    init();
  }, []);

  console.log(location, name);

  if (!location) {
    return <Container>Loading</Container>;
  }

  if (!loggedIn) {
    return <Redirect to="login" />;
  }

  console.log(location)

  return (
    <Container>
      <Header>
        <User>
          <Avatar>{name[0] && name[0].toUpperCase()}</Avatar>
            {name}
        </User>
        <button onClick={logOut}>Log Out</button>
      </Header>
      <Players>
        <h3>Players in this room</h3>
        {location.players.map(player => {
          return (
            <p key={player}>{player}</p>
          )
        })}
      </Players>
      <Game location={location} setLocation={setLocation} />
    </Container>
  );
}

export default withLogin(Home);
