import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { api } from "../lib/api";
import Room from "./Room";

const GameContainer = styled.div`
  box-sizing: border-box;
  padding-top: 50px;
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

const Controls = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px;
  grid-template-rows: 50px 50px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding-bottom: 20px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
  }

  div:first-child {
    border: none;
  }

  div:nth-child(3) {
    border: none;
  }

  button {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    color: #c5c5c5;
    cursor: pointer;
  }
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
       {!!location.error_msg && !moving && <Loader className="error">{location.error_msg}</Loader>}
      <Info>
        <h1>You are in: {location.title}</h1>
        <p>{location.description}</p>
      </Info>
      <Room location={location} moving={moving}/>
      <Controls direction={moving}>
        <div></div>
        <div>
          <button disabled={moving} onClick={() => clickHandler("n")}>
            North
          </button>
        </div>
        <div></div>
        <div>
          <button disabled={moving} onClick={() => clickHandler("w")}>
            West
          </button>
        </div>
        <div>
          <button disabled={moving} onClick={() => clickHandler("s")}>
            South
          </button>
        </div>
        <div>
          <button disabled={moving} onClick={() => clickHandler("e")}>
            East
          </button>
        </div>
      </Controls>
    </GameContainer>
  );
}

export default Game;
