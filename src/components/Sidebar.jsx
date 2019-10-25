import React from "react";
import styled from "styled-components";

const Side = styled.div`
  min-height: 100vh;
  width: 300px;
`;

const SideContainer = styled.div`
  position: fixed;
  top: 0;
  box-sizing: border-box;
  width: 300px;
  min-height: 100vh;
  border-right: 1px solid #c5c5c5;
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 20px;

  button {
    position: absolute;
    box-sizing: border-box;
    bottom: 20px;
    height: 40px;
    width: calc(100% - 40px);
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
`

const Players = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  text-align: left;
  
  div {
    height: 400px;
    overflow: scroll;
  }

  h3 {
    margin: 5px 0;
  }

  p {
    padding: 0 10px;
    margin: 5px 0;
  }
`;

function SideBar({ name, location, logOut }) {
  return (
    <Side>
    <SideContainer>
      <User>
        <Avatar>{name[0] && name[0].toUpperCase()}</Avatar>
        <h3>{name[0] && `${name[0].toUpperCase()}${name.slice(1)}`}</h3>
      </User>
      <Players>
        <h3>Players in this room</h3>
        <div>
            {location.players.map(player => {
            return <p key={player}>{player}</p>;
            })}
        </div>
      </Players>
      <button onClick={logOut}>Log Out</button>
    </SideContainer>
    </Side>
  );
}

export default SideBar;
