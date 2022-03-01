import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
//import Sidebar from '../Sidebar/Sidebar';
import styled from "styled-components";
import media from "styled-media-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../API/user";
import { loginAction } from "../../redux/store/actions";
//import LoadingPage from "../../LoadingPage";
import Aos from "aos";
import "aos/dist/aos.css";

// const Div = styled.div`
//     background-color: #ABCCFF;
//     height:100vh;
//     width:100vw;
// `

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > * {
    padding: 2rem;
    ${media.lessThan("medium")`
      padding: 2rem 1rem;
    `}
  }
  .pc {
    ${media.lessThan("medium")`
      display: none;
    `}
  }
  .mobile {
    display: none;
    ${media.lessThan("medium")`
      display: block;
    `}
  }
`;

const Bigdiv = styled.div`
  height: 400px;
  display: flex;
  text-align: center;
  align-items: center;
  margin: auto;
`;

const Gitdiv = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 35vw;
  height: 20vw;
`;

const UlBox = styled.div`
  width: 400px;
  height: 200px;
  padding: 50px;
  margin: auto;
`;

function Home() {
  const { isLogin, login_method } = useSelector(
    ({ userReducer }) => userReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const getKakaoCode = async (authCode) => {
      const res = await userApi.kakao(authCode, login_method);
      console.log("카카오 로그인 리다이렉트시 응답", res);
      if (res.status === 200) {
        dispatch(loginAction(res.data));
        navigate("/home", { replace: true });
      }
    };

    const getGoogleCode = async (authCode) => {
      const res = await userApi.google(authCode, login_method);
      console.log("구글 로그인 리다이렉트시 응답", res);
      if (res.status === 200) {
        dispatch(loginAction(res.data));
        navigate("/home", { replace: true });
      }
    };

    if (code) {
      if (state === "kakao") {
        getKakaoCode(code);
      } else {
        getGoogleCode(code);
      }
    }
  });

  return (
    <>
      <div>
        {/*// 페이드 다른거도 체크 // 물결?이동하는거 찾기 
          설명 문구, 사이드바 숨기는거 토글메뉴 다른거 할거 받아오기 */}
        <Bigdiv data-aos="fade-down">
          <UlBox>
            <p>설명1</p>
          </UlBox>
          <Gitdiv bgColor="#F9B10B" />
        </Bigdiv>
        <Bigdiv data-aos="fade-up">
          <Gitdiv bgColor="#f3b178" />
          <UlBox>
            <p>설명2</p>
          </UlBox>
        </Bigdiv>
        <Bigdiv data-aos="fade-right">
          <UlBox>
            <p>설명3</p>
          </UlBox>
          <Gitdiv bgColor="#2aa1b7" />
        </Bigdiv>
        <Bigdiv data-aos="fade-left">
          <Gitdiv bgColor="#d8d7d8" />
          <UlBox>
            <p>설명4</p>
          </UlBox>
        </Bigdiv>
        <Footer />
      </div>
    </>
  );
}
export default Home;
