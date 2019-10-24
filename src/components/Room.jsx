import React from 'react'
import styled from 'styled-components';

const Canvas = styled.canvas`
    width: 900px;
    height: 600px;
    border: 1px solid #c5c5c5;
`;

function Room() {
  const canvasRef = React.createRef();



  return (
    <Canvas ref={canvasRef}></Canvas>
  );
}

export default Room;
