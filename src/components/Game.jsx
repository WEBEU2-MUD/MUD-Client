import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { api } from "../lib/api";
import Roomio from "./Roomio";

const GameContainer = styled.div`
  box-sizing: border-box;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  .error {
    color: #ffb454;
  }
`;

const Info = styled.div`
    width: 800px;
`;

const Loader = styled.div`
    color: #c5c5c5;
    position: fixed;
    top: 30px;
`;

function Game({ location, setLocation }) {
  const [moving, setMoving] = useState();

  const clickHandler = useCallback(async direction => {
        setMoving(direction);
        try {
          const data = await api.move(direction);
          console.log(data)
          setMoving(false);
          setLocation(data);
        } catch (err) {
          setMoving(false);
          console.log(err);
        }
      },
      [setLocation],
  );

  return (
    <GameContainer>
       { moving && <Loader>Moving</Loader> }
      <Info>
        <h1>You are in: {location.title}</h1>
        <p>{location.description}</p>
      </Info>
      <Roomio location={location} moving={moving} clickHandler={clickHandler} />
    </GameContainer>
  );
}

export default Game;
