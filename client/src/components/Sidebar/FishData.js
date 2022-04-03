import React from "react";
import styled from "styled-components";
import riverFish from "./data/riverFish";
import seaFish from "./data/seaFish";
import FishDataList from "./FishDataList";
import { useState, Suspense } from "react";
import Footer from "../Footer/Footer";


const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const TitleBox = styled.title`
  display: flex;
  justify-content: space-evenly;
  margin: 15px;
  color: black;
  opacity: 0.7;
`;

const Div = styled.div``;
const FishBox = styled.div`
  background-color: rgb(222, 247, 243);
  width: 100vw;
  padding-bottom: 28vh;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  opacity: 0.7;
  padding: 5px;
  &:hover {
    background-color: rgb(222, 247, 243);
    cursor: pointer;
  }
  border-radius: 15px;
`;
const RiverFish = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: rgb(222, 247, 243);
  grid-gap: 1rem;
`;

const SeaFish = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: rgb(222, 247, 243);
  grid-gap: 1rem;
`;
function FishData() {
  const [sea, setSea] = useState(false);
  const SeaFishes = React.lazy(() => import("./FishDataList"))
  
  const onClick = () => {
    setSea(false);
    
  }

  return (
    <>
      <Container>
        <Div>
          <TitleBox>
            <Title
              onClick={() => {
                setSea(true);
              }}
            >
              바다물고기
            </Title>
            <Title
              onClick={onClick}
            >
              민물
            </Title>
          </TitleBox>
          <Suspense fallback={<div>로딩</div>}>
          {sea === true ? (
            <FishBox>
                <SeaFish>
                  {seaFish.map((el, idx) => (
                    <SeaFishes {...el} key={idx} />
                  ))}
                </SeaFish>
            </FishBox>
          ) 
          : 
          (
            <FishBox>
              <RiverFish>
                {riverFish.map((el, idx) => (
                  <FishDataList {...el} key={idx} />
                  ))}
              </RiverFish>
            </FishBox>
          )}
          </Suspense>
        </Div>
      </Container>
      <Footer />
    </>
  );
}

export default FishData;
