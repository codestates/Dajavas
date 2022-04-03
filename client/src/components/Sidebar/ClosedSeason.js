import React,{useState, useEffect} from "react";
import styled from "styled-components";
import closedSea from "./data/closed";
import Footer from "../Footer/Footer";
import { Suspense } from 'react';
import ClosedFishDataList from "../Sidebar/ClosedFishDataList" 
import LoadingPage from "../../LoadingPage";



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

const SeaFish = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: rgb(222, 247, 243);
  grid-gap: 1rem;
`;
const Text = styled.div`

`

function ClosedSeason() {
  const [state, setState] = useState(false)
  const loading = () => {
    setTimeout(() => {setState(true)}, 3000)
  }
  useEffect (() => {
    loading()
  }, [])
  

  return (
    <>
      <Container>
        <Div>
          <TitleBox>
            <Title>금어기</Title>
          </TitleBox>

          <FishBox>
            <SeaFish>
                
              {state === true ? 
              <Suspense fallback={<div><LoadingPage/></div>}>
              {closedSea.map((el, idx) => (
                <ClosedFishDataList {...el} key={idx} />
              ))}
              </Suspense>
              :
              <>
              <Text> 
              정보를 불러오고 있습니다. 
              </Text>
              </>
              }
               
              
               
            </SeaFish>
          </FishBox>
        </Div>
      </Container>
      <Footer />
    </>
  );
}

export default ClosedSeason;
