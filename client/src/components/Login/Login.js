import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Wave from "react-wavify";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri"; //카카오 아이콘
import { GoogleLogin } from "react-google-login";
import { 
  loginAction, 
} from "../../redux/store/actions";
import userApi from "../../API/user";
import Footer from "../Footer/Footer";

const Container = styled.div`
  width: 100vw;
  height: 100%;
`;
const GenBtn = styled.div`
  /* border: 1px dashed rebeccapurple; */
`

const Div = styled.div`
  padding: 9rem;
  justify-content: center;
  /* border: 1rem solid yellow; */
`
const Tag = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 3rem;
`
const StyledInput = styled.input`
  outline: none; /* outline 테두리 없애기 */
  border:0 ;
  background-color: #E8F0FE;
  border-radius: 0.5rem;
  width: 21.5rem;
  padding: 1rem;
  margin: 0.5rem;
`
const Social = styled.div`
  display: inline;
  padding: 1rem;
  margin: 1rem;
`
const Google = styled.button`
  outline: 0;
  font-weight: 500;
  font-size: 20px;
  border: 0;
  background-color: white;
`
const GenLogin = styled.button`
  margin: 1rem;
  padding: 0.7rem;
  width: 23.6rem;
  border: 3px solid #2AA1B7;
  outline: none;
  border-radius: 0.4rem;
  background-color: white;
  font-size: 20px;
  font-weight: 500;
  color: #2AA1B7;
  &:hover{
    cursor: pointer;
    background-color: #2AA1B7;
    color: white
  }
`
const Kakao = styled.button`
  margin-right: 1rem;
  outline: none;
  border: 0;
  font-weight: 500;
  font-size: 20px;
  background-color: yellow;
  border-radius: 0.4rem;
  padding: 0.7rem;
  box-shadow: 0.5px 1px 2px 1px lightgray;
  opacity: 0.7;
`
const Text = styled.div`
  margin-top: 1.3rem;
  font-size: 20px;
`
const Btn = styled.button`
  border: 3px white;
  margin: 0.4rem;
  outline: none;
  border-radius: 0.4rem;
  height: 3rem;
  width: 11.5rem;
  margin-top: 1rem;
  background-color: #2AA1B7;
  font-size: 20px;
  color: white;
  &:hover{
    cursor: pointer;
    background-color: white;
    border: 3px solid #2AA1B7;
    color: #2AA1B7
  }
`

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

  const handleLoginInputValue = debounce(async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
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
      try {
        const res = await userApi.login(loginInputValue);
        if (res.status === 200) {
          dispatch(loginAction(res.data.data));
          navigate("/", { replace: true });
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
  };

  const success = async (e) => {
    const a = await userApi.google(e.profileObj, "2");
    if (a.status === 200) {
      dispatch(loginAction(a.data.data));
      navigate("/", { replace: true });
    }
  };
  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <Container>
      <Div>
        <div className="loginInputContainer">
          <Tag>
            로그인
          </Tag>
          <form id="login">
            <div>
              <StyledInput
                box
                name="email"
                type="text"
                placeholder="이메일"
                autoComplete="username"
                onChange={handleLoginInputValue}
              />
            </div>
            <div>
              <StyledInput
                name="password"
                type="password"
                placeholder="비밀번호"
                autoComplete="current-password"
                onChange={handleLoginInputValue}
              />
            </div>
          </form>
          <GenLogin onClick={handleLogin}>로그인</GenLogin>
        </div>
        <Social>
          <Kakao className="kakao" onClick={handleLoginKakao}>
            <RiKakaoTalkFill/>
            카카오로 로그인
          </Kakao>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_REST_KEY}
            responseType={"id_token"}
            onSuccess={success}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          >
            <Google>구글로 로그인</Google>
          </GoogleLogin>
        </Social>
        <Text>아직 아이디가 없으신가요?</Text>
        <GenBtn>
          <Btn onClick={() => navigate("/", { replace: false })}>홈으로</Btn>
          <Btn onClick={() => navigate("/signup", { replace: false })}>
            회원가입
          </Btn>
        </GenBtn>
        <div>{errorMessage}</div>
      </Div>
      <Wave
        fill = '#1277b0'
        paused={false}
        options={{
            height: 10,
            amplitude: 18,
            speed: 0.30,
            points: 8
        }}
      />
      <Footer/>
    </Container>
  );
}
export default Login;