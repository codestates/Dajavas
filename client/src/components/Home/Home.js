import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../API/user";
import { loginAction } from "../../redux/store/actions";
import Aos from "aos";
import "aos/dist/aos.css";

import ranking from '../../gif/랭킹편집.gif'
//import ranking from '../../img/랭킹편집.jpg'
import record from'../../img/기록.jpg'
import closedFish from '../../img/금어기.jpg'
import map from '../../img/지도.jpg'

const HomeContainer = styled.div`
  width: 100%;
`

const Bigdiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin: auto;
`;

const Gitdiv = styled.img`
  background-color: ${(props) => props.bgColor};  
  width: 50vw;
  height: 30vw;
  border-radius: 10px;
  margin: 3rem;
  box-shadow: 10px 10px #D8D7D8;
  
  
`;

const UlBox = styled.div`
  width: 400px;
  height: 200px;
  padding: 50px;
  margin: auto;

`;

const BigTitle = styled.div`
  opacity: 0.7;
  font-size: 2rem;
  font-weight: bold;
  margin: 10px;
  margin-left:30px;
  margin-bottom: 0;
  margin-top:2rem;

`
const Title = styled.div`
  opacity: 0.7;
  font-size: 2rem;
  font-weight: bold;
  margin: 10px;
  
`
const Blank = styled.div`
 
`
const End = styled.div`
  opacity: 0.7;
  font-size: 2rem;
  font-weight: bold;
  margin-left: 39rem;
  margin-bottom:10rem;
  margin-top: 5rem;
`
const Div = styled.div`
  padding: 2rem;
  
`
const SubTitle = styled.div`
  margin-left: 44rem;
  color:#7DAFB9;
  opacity: 0.9;
  font-size: 5rem;
  font-weight: bold;
  padding: 0;

`
const Sub = styled.div`
  opacity: 0.7;
  font-size: 1rem;
  font-weight: bold;
`

function Home() {
 
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
      const res = await userApi.kakao(authCode, '1');
      if (res.status === 200) {
        dispatch(loginAction(res.data.data));
        navigate("/", { replace: true });
      }
    };

    const getGoogleCode = async (authCode) => {
      const res = await userApi.google(authCode, '2');
      if (res.status === 200) {
        dispatch(loginAction(res.data));
        navigate("/", { replace: true });
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
    <HomeContainer>
      <div>
        {/*// 페이드 다른거도 체크 // 물결?이동하는거 찾기 
          설명 문구, 사이드바 숨기는거 토글메뉴 다른거 할거 받아오기 */}
           
        <Bigdiv data-aos="fade-right">
          {/* <Gitdiv bgColor="#f3b178"  src={ranking}/> */}
          <Div>
            <BigTitle>낚시 초심자들을 위한 웹 사이트 </BigTitle>
          </Div>
        </Bigdiv>
        <Bigdiv data-aos="fade-left">
          <Div>
            <SubTitle>Dajavas</SubTitle>
          </Div>
        </Bigdiv>

        <Bigdiv data-aos="fade-down">
          <Gitdiv bgColor="#f3b178"  src={ranking}   alt="first"/>
          <UlBox>
            <Title>내가 잡은 물고기를 랭크에 올려보세요</Title>
              <Sub> 사람들과 공유할 수 있어요</Sub>
          </UlBox>
        </Bigdiv>
        <Bigdiv data-aos="fade-right" >
          <UlBox>
          <Title>나만의 낚시 포인트를 만들어보세요</Title>
            <Sub>다자바스에서 제공한 추천 낚시 포인트도 제공합니다</Sub>
          </UlBox>
          <Gitdiv bgColor="#2aa1b7" src={map}  alt="second"/>
        </Bigdiv>
        
        <Bigdiv>
          <Gitdiv bgColor="#F9B10B" src={record}  alt="third"/>
          <UlBox data-aos="fade-down">
            <Title> 물고기 사진 정보 저장</Title>
            <Sub> 내가 잡은 물고기를 간단 기록할 수 있습니다</Sub>
          </UlBox>
        </Bigdiv>

        <Bigdiv data-aos="fade-right">
          <UlBox>
          <Title>금어기, 방생 기준 외 필수 낚시 용품들까지!</Title>
            <Sub>초보 낚시꾼에게 필요한 낚시 정보들을 제공합니다 </Sub>
          </UlBox>
          <Gitdiv bgColor="#d8d7d8" src={closedFish} alt="fourth"/>
        </Bigdiv>

        <Bigdiv data-aos="fade-up">
        {/* <Gitdiv bgColor="#f3b178"  src={ranking}/> */}
        <Div>
          <Blank></Blank>
          <End>당신의 낚시 생활 Dajavas가 함께 합니다.</End>
        </Div>
        </Bigdiv>
        

        <Footer />
      </div>
    </HomeContainer>
  );
}
export default Home;
