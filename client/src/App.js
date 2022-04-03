import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Rout from './Routes'
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import styled from "styled-components";
import { useState } from "react";

const Box = styled.div`
  display: flex; 
  width: 100vw;
  height:130vh;
  display: flex;
  flex: 2 auto; 
`;

const Container = styled.div`
  /* width: 100vw; */
`;

const Div = styled.div`
  width: ${props => props.btnClicked ? '90vw' : '100vw'};
`;

const Sidediv = styled.div``;

//   display: flex;
//   width: 100vw;
//   /*  width: ${(props) => (props.dev ? "100vw" : "100vw")}; */
//   height: 130vh;
//   /* width: 100vw;
//    display: flex;
//   flex: 2 auto; */
// `;

// const Container = styled.div`
//   width: 100%;
// `;

// const Divs = styled.div`
//   flex: 1 1 auto;
// `;
// const Div = styled.div`
//   flex: 1 1 auto;
// `;

function App() {
  const [btn, setBtn] = useState(false);
  

  return (
    <Container className="App">
      <Router>
        <Box>
          <Div btnClicked={btn}>
            <Nav setBtn={setBtn} btn={btn}/>
            <Routes>
              <Route exact path="/" element={<Rout.Home />} />
              <Route exact path="/ranking" element={<Rout.Ranking />} />
              <Route exact path="/map" element={<Rout.Map />} />
              <Route exact path="/fishboard" element={<Rout.FishBoard />} />
              <Route exact path="/fishdata" element={<Rout.FishData />} />
              <Route exact path="/closedseason" element={<Rout.ClosedSeason />} />
              <Route exact path="/checklist" element={<Rout.CheckList />} />
              <Route exact path="/mypage" element={<Rout.MyPage />} />
              <Route exact path="/record" element={<Rout.BoardContent />} />
              <Route exact path="/errorpage" element={<Rout.ErrorPage />} />
              <Route exact path="/login" element={<Rout.Login />} />
              <Route exact path="/signup" element={<Rout.Signup />} />
              <Route exact path="/updatefish" element={<Rout.UpdateFish />} />
            </Routes>
          </Div>
          <Sidediv>
            <Sidebar setBtn={setBtn} btn={btn}/>
          </Sidediv>
        </Box>
      </Router>
    </Container>
  );
}

export default App;
