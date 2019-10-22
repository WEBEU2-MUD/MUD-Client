import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RoomContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 600px;
  width: 800px;
  border: 1px solid #c5c5c5;
  margin: 20px;
`;

const Car = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  transform: ${({ degs }) => `rotate(${degs}deg)`};
`;

const rand = (num) => Math.floor(Math.random() * num);

const cars = [
  "https://res.cloudinary.com/dgdniqfi9/image/upload/v1571748552/cs_game/car.png",
  "https://res.cloudinary.com/dgdniqfi9/image/upload/v1571755422/cs_game/car2.svg",
  "https://res.cloudinary.com/dgdniqfi9/image/upload/v1571755651/cs_game/yellowcar.png"
];

const OtherPlayer = ({player}) => {
  const top = rand(350);
  const left = rand(750);
  const deg = rand(4) * 90;
  const car = cars[rand(4)];
  
  return (
    <Car degs={deg} top={top} left={left}>
      <img src={car} alt="" width={50} />
    </Car>
  )
}

function Room({ location, moving }) {
  const [direction, setDirection] = useState(0);
  const [cars,setCars] = useState([]);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const c = location.players.map(each => <OtherPlayer player={each} />);
    setCars(c);
  }, [location.players]);

  useEffect(() => {
    document.addEventListener("keydown", e => {
      switch (e.which) {
        case 38:
          setTop(pos => pos !== 0 ? (pos -= 50) : pos);
          setDirection(-90);
          break
        case 37:
          setLeft(pos => pos !== 0 ? (pos -= 50) : pos);
          setDirection(180);
          break
        case 39:
          setLeft(pos => pos !== 750 ? (pos += 50) : pos);
          setDirection(0);
          break
        case 40:
          setTop(pos => pos !== 400 ? (pos += 50) : pos);
          setDirection(90);
          break
        default:
          break;
      }
    });
  }, []);

  return (
    <RoomContainer>
      {!moving && cars}
      <Car degs={direction} top={top} left={left}>
        <img
          src="https://res.cloudinary.com/dgdniqfi9/image/upload/v1571748552/cs_game/car.png"
          alt=""
          width={50}
        />
      </Car>
    </RoomContainer>
  );
}

export default Room;
