import React from "react";
import { Link } from "react-router-dom";
import FishList from "./FishList";
import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import photo from "../../../img/월척.jpg";
import { fishBoard } from "../../../redux/store/actions/index";
import Modal from "../../Modal/Modal";
import LoadingPage from "../../../LoadingPage";
import { useNavigate } from "react-router-dom";
import { FaClipboardCheck } from "react-icons/fa";
import Footer from "../../Footer/Footer";

const Background = styled.div`
  background-color: #8bbac2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  height: 110vh;
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  transition: all 0.7s ease-in-out;
  border-radius: 5%;
  margin-left: 35rem;
  margin-right: 35rem;
  background-color: #8dd1b4;
  box-shadow: 3px 3px #d8d7d8;
  &:hover {
    transform: scale(1.1);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;
const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page = styled.h2`
  color: black;
  opacity: 0.7;
  padding: 6px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.5);
    cursor: pointer;
    color: coral;
  }
`;

function FishBoard({ userInfo, myFishBoard, fishBoard }) {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [render, rerender] = useState(false);
  const [page, setPage] = useState(1);

  //페이지네이션
  useEffect(() => {
    const start = () => {
      setTimeout(() => {
        setLoading(!false);
      }, 3000);
      if (userInfo.isLogin === true) {
        fishBoard(userInfo.email, page, userInfo.accessToken);
      } else {
        return;
      }
    };
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // 삭제할때 필요함(fishList에서 상태변경됨)
  useEffect(() => {
    if (userInfo.isLogin === true) {
      fishBoard(userInfo.email, page, userInfo.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const result = [
    {
      fish_name: "도다리",
      ranked: 0,
      src: photo,
      size: 30,
      createdAt: "2022-01-20",
      fishId: 3,
    },
    {
      fish_name: "숭어",
      ranked: 1,
      src: photo,
      size: 32,
      createdAt: "2022-01-20",
      fishId: 6,
    },
    {
      fish_name: "홍어",
      ranked: 0,
      src: photo,
      size: 20,
      createdAt: "2022-01-23",
      fishId: 11,
    },
    {
      fish_name: "광어",
      ranked: 1,
      src: photo,
      size: 55,
      createdAt: "2022-02-07",
      fishId: 40,
    },
    {
      fish_name: "도다리",
      ranked: 1,
      src: photo,
      size: 45,
      createdAt: "2022-02-20",
      fishId: 2,
    },
  ];

  const goHome = () => {
    alert("로그인을 하세요");
    navigate("/login");
  };

  const load = () => {
    if (loading === false) {
      return (
        <Div>
          <LoadingPage />
        </Div>
      );
    }
    return (
      <>
        <Modal text="회원님이 잡은 물고기 목록을 볼 수 있습니다." />
        <Div>
          <Title>
            <div>
              <Link
                to="/record"
                style={{
                  textDecoration: "none",
                  color: "#0E3B5B",
                  fontWeight: "bolder",
                }}
              >
                기록하기
                <FaClipboardCheck />
              </Link>
            </div>
          </Title>
          {fishboardData()}
        </Div>
      </>
    );
  };

  const fishboardData = () => {
    if (userInfo.isLogin === false) {
      return (
        <>
          <Container>
            {result.map((el) => (
              <FishList key={el.fishId} {...el} />
            ))}
          </Container>
          <Pagenation>
            <Page onClick={goHome}>1</Page>
            <Page onClick={goHome}>2</Page>
            <Page onClick={goHome}>3</Page>
            <Page onClick={goHome}>4</Page>
            <Page onClick={goHome}>5</Page>
          </Pagenation>
        </>
      );
    } else {
      if (myFishBoard.data === []) {
        return <h3>기록하신 정보가 없습니다.</h3>;
      } else if (myFishBoard.data.data.realResult) {
        return (
          <>
            <Container>
              {myFishBoard.data.data.realResult.map((el) => (
                <FishList
                  key={el.fishId}
                  {...el}
                  render={render}
                  rerender={rerender}
                />
              ))}
            </Container>
            <Pagenation>
              <Page onClick={() => setPage(1)}>1</Page>
              <Page onClick={() => setPage(2)}>2</Page>
              <Page onClick={() => setPage(3)}>3</Page>
              <Page onClick={() => setPage(4)}>4</Page>
              <Page onClick={() => setPage(5)}>5</Page>
            </Pagenation>
          </>
        );
      }
    }
  };

  return (
    <>
      <Background>{load()}</Background>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
    myFishBoard: state.fishBoardReducer,
  };
};

const mapDispatchToProps = {
  fishBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(FishBoard);
