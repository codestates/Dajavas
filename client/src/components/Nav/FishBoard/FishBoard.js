import React from "react";
import { Link } from "react-router-dom";
import FishList from "./FishList";
import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import photo from "../../../img/월척.png";
import { fishBoard } from "../../../redux/store/actions/index";
import Modal from "../../Modal/Modal";
import LoadingPage from "../../../LoadingPage";

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;
const Btn = styled.button`
  width: 10em;
  height: 5em;
`;

function FishBoard({ userInfo, myFishBoard, fishBoard }) {
  axios.defaults.withCredentials = true;

  // 로그인 여부 userInfo.isLogin
  console.log(userInfo, myFishBoard, fishBoard, "++++++++");
  const [loading, setLoading] = useState(false);
  const [render, rerender] = useState(false);

  const start = () => {
    if (userInfo.isLogin === true) {
      fishBoard(userInfo.email, 1, userInfo.accessToken);
      setTimeout(() => {
        setLoading(!false);
      }, 3000);
    } else {
      setTimeout(() => {
        setLoading(!false);
      }, 3000);
    }
  };

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (userInfo.isLogin === true) {
      fishBoard(userInfo.email, 1, userInfo.accessToken);
      setTimeout(() => {
        setLoading(!false);
      }, 3000);
    }
  }, [render]);

  // console.log(myFishBoard.data.data.result,'🌺')

  axios.defaults.withCredentials = true;

  const result = [
    {
      fish_name: "도다리",
      ranked: 57,
      src: photo,
      size: 5,
      createdAt: "20220220",
      fishId: 3,
    },
    {
      fish_name: "숭어",
      ranked: 57,
      src: photo,
      size: 10,
      createdAt: "20220220",
      fishId: 6,
    },
    {
      fish_name: "홍어",
      ranked: 57,
      src: photo,
      size: 5,
      createdAt: "20220220",
      fishId: 11,
    },
    {
      fish_name: "광어",
      ranked: 57,
      src: photo,
      size: 5,
      createdAt: "20220220",
      fishId: 40,
    },
    {
      fish_name: "도다리",
      ranked: 57,
      src: photo,
      size: 5,
      createdAt: "20220220",
      fishId: 2,
    },
  ];

  return (
    <>
      {userInfo.isLogin === false ? (
        <div>
          {loading === false ? (
            <>
              <LoadingPage />
            </>
          ) : (
            <>
              <Modal text="회원님이 잡은 물고기 목록을 볼 수 있습니다." />
              <Div>
                <Title>
                  <h1>나의 월척~</h1>
                  <Btn>
                    <Link
                      to="/record"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      기록하기
                    </Link>
                  </Btn>
                </Title>
                {result.map((el) => (
                  <FishList key={el.fishId} {...el} />
                ))}
              </Div>
            </>
          )}
        </div>
      ) : (
        <div>
          {loading === false ? (
            <>
              <LoadingPage />
            </>
          ) : (
            <>
              <Modal text="회원님이 잡은 물고기 목록을 볼 수 있습니다." />
              <Div>
                <Title>
                  <h1>나의 월척~</h1>
                  <Btn>
                    <Link
                      to="/record"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      기록하기
                    </Link>
                  </Btn>
                </Title>
                {myFishBoard.data.data.result.map((el) => (
                  <FishList
                    key={el.fishId}
                    {...el}
                    render={render}
                    rerender={rerender}
                  />
                ))}
              </Div>
            </>
          )}
        </div>
      )}
    </>
  );
}
//result={result}
const mapStateToProps = (state) => {
  // console.log(state,'88888')
  return {
    userInfo: state.userReducer,
    myFishBoard: state.fishBoardReducer,
  };
};

const mapDispatchToProps = {
  fishBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(FishBoard);
