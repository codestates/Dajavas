import React from "react";
import styled from "styled-components";
import Wave from "react-wavify";

const Div = styled.div`
  top: 50%;
  left: 50%;
  width: 350px;
  height: 350px;
  border-radius: 80%;
`;

function LoadingPage() {
  return (
    <Div>
      <Wave
        fill="#2aa1b7"
        pause={false}
        options={{ heigth: 0, amplitued: 50, speed: 0.2, points: 4 }}
      ></Wave>
    </Div>
  );
}

export default LoadingPage;
