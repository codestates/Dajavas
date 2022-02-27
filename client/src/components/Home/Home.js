import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
//import Sidebar from '../Sidebar/Sidebar';
import styled from 'styled-components';
import media from "styled-media-query";
import LoadingPage from '../../LoadingPage'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userApi from '../../API/user';
import { loginAction } from '../../redux/store/actions';

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

function Home() {
    
   
  const {isLogin, login_method} = useSelector(({userReducer}) => userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const url =  new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const getKakaoCode = async (authCode) => {
      const res = await userApi.kakao(authCode, login_method);
      console.log('카카오 로그인 리다이렉트시 응답',res);
      if (res.status === 200){
        dispatch(loginAction(res.data));
        navigate('/', {replace: true});
      }
    };

    const getGoogleCode = async (authCode) => {
      const res = await userApi.google(authCode, login_method);
      console.log('구글 로그인 리다이렉트시 응답',res);
      if(res.status === 200){
        dispatch(loginAction(res.data));
        navigate('/', {replace: true});
      }
    };

    if(code){
      if(state === 'kakao'){
        getKakaoCode(code);
      } else{
        getGoogleCode(code);
      }
    }

  })

    return (
      <>
        <div>
          아에이오우
        </div>
      </>


    )
}

export default Home
