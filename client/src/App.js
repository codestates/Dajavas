import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Ranking from "./components/Nav/Ranking/Ranking";
import Map from "./components/Nav/Map/Map";
import FishBoard from "./components/Nav/FishBoard/FishBoard";
import FishData from "./components/Sidebar/FishData";
import ClosedSeason from "./components/Sidebar/ClosedSeason";
import CheckList from "./components/Sidebar/CheckList";
import MyPage from "./components/Sidebar/MyPage";
import BoardContent from "./components/Nav/FishBoard/BoardContent";
import ErrorPage from "./ErrorPage";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import UpdateFish from "./components/Nav/FishBoard/UpdateFish";
import styled from "styled-components";

import axios from "axios";
import { useState } from "react";

const Box = styled.div`
  display: flex;
`;

const Div = styled.div``;

function App() {
  const [isLogin, setIsLogin] = useState(false); //로그인 여부
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    nickname: "",
    login_method: "",
    accessToken: "",
  });
  // accessToken, id, email, nickname, login_method

  const loginState = (result) => {
    console.log("결과를 잘 가져왔나요", result);
    setIsLogin(true);
    setUserInfo({
      id: result.data.data.id,
      email: result.data.data.email,
      nickname: result.data.data.nickname,
      login_method: result.data.data.login_method,
      accessToken: result.data.data.accessToken,
    });
    console.log("유저정보 상태변경", userInfo);
    console.log("로그인정보 상태변경", isLogin);
  };

  const handleLogout = () => {
    axios
      .post(`https://localhost:5000/user/logout/0:/${userInfo.id}`)
      .then((res) => {
        setUserInfo(null);
        setIsLogin(false);
        window.location.replace("/");
      });
  };

  return (
    <div className="App">
      <Router>
        <Box>
          <Div>
            <Sidebar isLogin={isLogin} userInfo={userInfo} />
          </Div>
          <Div>
            <Nav />
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/ranking" element={<Ranking />} />
              <Route exact path="/map" element={<Map />} />
              <Route exact path="/fishboard" element={<FishBoard />} />
              <Route exact path="/fishdata" element={<FishData />} />
              <Route exact path="/closedseason" element={<ClosedSeason />} />
              <Route exact path="/checklist" element={<CheckList />} />
              <Route
                exact
                path="/mypage"
                element={
                  <MyPage
                    isLogin={isLogin}
                    userInfo={userInfo}
                    handleLogout={handleLogout}
                  />
                }
              />
              <Route exact path="/record" element={<BoardContent />} />
              <Route exact path="/errorpage" element={<ErrorPage />} />
              <Route
                exact
                path="/login"
                element={
                  <Login
                    isLogin={isLogin}
                    userInfo={userInfo}
                    loginState={loginState}
                  />
                }
              />
              <Route
                exact
                path="/signup"
                element={<Signup userInfo={userInfo} />}
              />
              <Route exact path="/updatefish" element={<UpdateFish />} />
            </Routes>
          </Div>
        </Box>
      </Router>
    </div>
  );
}

export default App;
