import React from "react";
import styled from "styled-components";
import Wave from "react-wavify";

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #8bbac2;
`;

const Blank = styled.div`
  padding-top: 100px;
  margin: 0;
  font-weight: bolder;
  font-size: xx-large;
  background-color: #8bbac2;
`;

const BlueWave = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1277b0;
  margin-top: 0;
`;

function LoadingPage() {
  return (
    <Div>
      <Blank>로딩중...</Blank>
      <Wave
        fill="#1277b0"
        paused={false}
        options={{
          height: 80,
          amplitude: 40,
          speed: 0.3,
          points: 8,
        }}
      />
      <BlueWave></BlueWave>
    </Div>
  );
}

export default LoadingPage;
