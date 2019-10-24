import React, { useState, useEffect, useRef } from "react";
import car from "./spaceship_east.png";
import car_south from "./spaceship_south.png";
import car_north from "./spaceship_north.png";
import car_west from "./spaceship_west.png";
import caveman from "./caveman.png";
import vicar from "./vicar.png";
import roman from "./roman.png";
import pirate from "./pirate.png";
import styled from "styled-components";

const Canvas = styled.canvas`
  border: 1px solid #c5c5c5;
  background: #000;
`;

const Scores = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

const Score = styled.div`
  width: 140px;
  height: 50px;
  border: 1px solid #c5c5c5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Crash = styled.div`
  position: fixed;
  border: 1px solid #c5c5c5;
  height: 500px;
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Roomio({ location, clickHandler, moving }) {
  const [exit, setExit] = useState({
    n: true,
    s: true,
    w: true,
    e: true
  });

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [direction, setDirection] = useState("e");
  const [objects, setObjects] = useState([]);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [right, setRight] = useState(true);
  const [down, setDown] = useState(false);
  const [up, setUp] = useState(false);
  const [left, setLeft] = useState(false);

  const [dead, setDead] = useState(false);

  const canvasRef = React.createRef();

  const rand = num => Math.floor(Math.random() * num);

  useEffect(() => {
    const hs = localStorage.getItem("score");
    if (hs) {
      setHighScore(JSON.parse(Math.floor(hs)));
    }
    function generateObjects(length) {
      const objects = [];

      for (let i = 0; i < length; i++) {
        const ob = {
          width: 30,
          height: 50,
          x: rand(725),
          y: rand(450)
        };
        objects.push(ob);
      }
      return objects;
    }

    const obs = generateObjects(location.title.length / 2);
    setObjects(obs);
  }, [location.title]);

  useInterval(
    () => {
      if (location.error_msg) return setDead(true);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      setScore(s => (s += 0.1));

      function getCar() {
        switch (direction) {
          case "e":
            return car;
          case "s":
            return car_south;
          case "n":
            return car_north;
          case "w":
            return car_west;
          default:
            return car;
        }
      }

      function drawCar() {
        let base_image = new Image();
        base_image.src = getCar();
        ctx.drawImage(base_image, x, y);
      }

      function getImage(room) {
        switch (true) {
          case room.includes("Church"):
            return vicar;
          case room.includes("Cave"):
            return caveman;
          case room.includes("Roman"):
            return roman;
          case room.includes("Pirate"):
            return pirate;
          default:
            return car_north;
        }
      }

      function drawObjects() {
        objects.forEach(each => {
          let base_image = new Image();
          base_image.src = getImage(location.title);
          ctx.drawImage(base_image, each.x, each.y, each.width, each.height);
        });
      }

      async function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCar();
        drawObjects();

        switch (true) {
          case right:
            if (x > canvas.width - 50) {
              if (exit.e) {
                await clickHandler("e");
                setScore(s => (s += 100));
                setX(0);
                setY(canvas.height / 2);
              } else {
                setDead(true);
              }
            } else {
              objects.forEach(each => {
                if (
                  x > each.x - 50 &&
                  x < each.x + each.width &&
                  (y > each.y - 25 && y < each.y + each.height)
                ) {
                  setDead(true);
                  console.log("crashed");
                }
              });
              setDirection("e");
              return setX(prev => (prev += 5));
            }
            break;

          case left:
            if (x < 0) {
              if (exit.w) {
                await clickHandler("w");
                setScore(s => (s += 100));
                setX(canvas.width);
                setY(canvas.height / 2);
              } else {
                setDead(true);
              }
            } else {
              objects.forEach(each => {
                if (
                  x > each.x &&
                  x < each.x + each.width &&
                  (y > each.y - 25 && y < each.y + each.height)
                ) {
                  setDead(true);
                  console.log("crashed");
                }
              });
              setDirection("w");
              return setX(prev => (prev -= 5));
            }
            break;

          case up:
            if (y < 0) {
              if (exit.n) {
                await clickHandler("n");
                setScore(s => (s += 100));
                setX(canvas.width / 2);
                setY(canvas.height);
              } else {
                setDead(true);
              }
            } else {
              objects.forEach(each => {
                if (
                  x > each.x &&
                  x < each.x + each.width &&
                  (y > each.y && y < each.y + each.height)
                ) {
                  setDead(true);
                  console.log("crashed");
                }
              });
              setDirection("n");
              return setY(prev => (prev -= 5));
            }
            break;

          case down:
            if (y > canvas.height - 50) {
              if (exit.s) {
                await clickHandler("s");
                setScore(s => (s += 100));
                setX(canvas.width / 3);
                setY(0);
              } else {
              }
            } else {
              objects.forEach(each => {
                if (
                  x > each.x &&
                  x < each.x + each.width &&
                  (y > each.y - 50 && y < each.y + each.height)
                ) {
                  setDead(true);
                  console.log("crashed");
                }
              });
              setDirection("s");
              return setY(prev => (prev += 5));
            }
            break;

          default:
            return;
        }
      }

      function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          setLeft(false);
          setUp(false);
          setDown(false);
          return setRight(true);
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          setRight(false);
          setUp(false);
          setDown(false);
          return setLeft(true);
        } else if (e.key === "Down" || e.key === "ArrowDown") {
          setLeft(false);
          setUp(false);
          setRight(false);
          return setDown(true);
        } else if (e.key === "Up" || e.key === "ArrowUp") {
          setLeft(false);
          setRight(false);
          setDown(false);
          return setUp(true);
        }
      }

      document.addEventListener("keydown", keyDownHandler, true);

      if (score > highScore) {
        localStorage.setItem("score", score);
        setHighScore(Math.floor(score));
      }

      if (!dead) draw();
    },
    moving || dead ? null : 10
  );

  return (
    <div>
      <Scores>
        <Score>Score: {Math.floor(score)}</Score>
        <Score>High score: {highScore}</Score>
      </Scores>
      {dead && <Crash>You Crashed</Crash>}
      {moving && <Crash>Moving</Crash>}

      <Canvas ref={canvasRef} width={800} height={500}></Canvas>
    </div>
  );
}

export default Roomio;
