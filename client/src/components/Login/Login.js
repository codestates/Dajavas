import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "styled-media-query";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fa"; //구글 아이콘
import { RiKakaoTalkFill } from "react-icons/ri"; //카카오 아이콘

import { loginAction } from "../../redux/store/actions";
import userApi from "../../API/user";
import userReducer from "../../redux/store/reducers/userReducer/userReducer";

function Login({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    //입력값
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState({
    //유효성 검사 통과여부
    email: true,
    password: true,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // const { email, nickname, isLogin, id, login_method, accessToken} = useSelector((userReducer)=>userReducer);

  const handleLoginInputValue = debounce(async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    // console.log('버튼 클릭시 인풋 데이터 모음',inputValue);
    if (name === "email") {
      const emailVal =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
          value
        );
      setValidated({ ...validated, [name]: emailVal });
    } else if (name === "password") {
      const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
        value
      );
      /*  조건1. 6~20 영문 대소문자
                조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함  
            */
      setValidated({ ...validated, [name]: passwordVal });
    }
  }, 200);

  const handleLogin = async (e) => {
    e.preventDefault();
    const valResult = validated.email && validated.password;
    if (valResult) {
      const loginInputValue = { ...inputValue };
      console.log("로그인 인풋벨류", loginInputValue);
      // console.log('이즈로그인',isLogin)
      // console.log('email',email)
      try {
        const res = await userApi.login(loginInputValue);
        // console.log('인풋벨류는??',loginInputValue)

        console.log("응답은 뭐라고 왔나?", res.data.data);
        if (res.status === 200) {
          // console.log('로그인시 저장된 데이터', res);
          console.log("디스패치 전", res.data.data.isLogin);
          dispatch(loginAction(res.data.data));
          console.log("디스패치 후", res.data.data.isLogin);
          navigate("/home", { replace: true });
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("입력하신 내용을 다시 확인해주세요");
      }
    }
  };

  const handleLoginKakao = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&state=kakao`
    );
    /* 결과 redirect_url
        https://localhost:3000/?
        code=_ecjyJZfATYit-VAKVAfsZv-brL85ttUn0vtEeUnePulrBS3TMY7c5pxGHjadAj2VNnMfAopb7kAAAF_J4z1xQ
        &
        state=kakao
        */
  };

  const handleLoginGoogle = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
    );
    /* 결과 redirect_url
        https://localhost:3000/?state=google
        &
        code=4%2F0AX4XfWjkFb16QFmkVBDAE6FUcypyXBaxgfB61q-wfkx2a-RplVkIhRxrx3AAr_hWwyaNhg
        &
        scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid
        &
        authuser=1
        &
        prompt=consent
        */
  };

  return (
    <>
      <div className="loginInputContainer">
        login
        <form id="login">
          <div>
            <input
              name="email"
              type="text"
              placeholder="이메일"
              autoComplete="username"
              onChange={handleLoginInputValue}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              autoComplete="current-password"
              onChange={handleLoginInputValue}
            />
          </div>
        </form>
        <button onClick={handleLogin}>로그인</button>
      </div>
      <button className="google" onClick={handleLoginGoogle}>
        구글로 로그인
      </button>
      <button className="kakao" onClick={handleLoginKakao}>
        카카오로 로그인
      </button>
      <button onClick={() => navigate("/home", { replace: false })}>
        홈으로
      </button>
      <div>아직 아이디가 없으신가요?</div>
      <button onClick={() => navigate("/signup", { replace: false })}>
        회원가입
      </button>
      <div>{errorMessage}</div>
    </>
  );
}

export default Login;
