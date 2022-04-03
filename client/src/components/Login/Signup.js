import React from "react";
import { useState } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { RiKakaoTalkFill } from "react-icons/ri"; //카카오 아이콘
import { useNavigate } from "react-router-dom";
import Wave from "react-wavify";
import { GoogleLogin } from "react-google-login";
import { loginAction } from "../../redux/store/actions";
import userApi from "../../API/user";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vw;
`
const Tag = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 3rem;
`
const SignupWraper = styled.div`
  padding: 5rem;
`
const SignupInput = styled.input`
  outline: none; /* outline 테두리 없애기 */
  border:0 ;
  background-color: #E8F0FE;
  border-radius: 0.5rem;
  width: 21.5rem;
  padding: 1rem;
  margin: 0.5rem;
`

const SignupBtn = styled.button`
  
`
const Social = styled.div`
  margin: 0.5rem;
  padding: 1rem;
`
const Google = styled.button`
  outline: 0;
  font-weight: 500;
  font-size: 20px;
  border: 0;
  background-color: white;
`
const GenSignup = styled.button`
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
const GenBtn = styled.div`
  /* border: 1px dashed rebeccapurple; */
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

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    //입력값
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    login_method: 0,
  });

  const [validated, setValidated] = useState({
    //유효성 검사 통과여부
    email: true,
    nickname: true,
    password: true,
    passwordCheck: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isOnVerification, setIsOnVerification] = useState(false); //모든항목 유효성 검사 통과여부

  const handleInputChange = debounce(async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (name === "email") {
      const emailVal =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
          value
        );
      setValidated({ ...validated, [name]: emailVal });
      if (value === "") {
        setErrorMessage("");
      } else if (emailVal) {
        setErrorMessage("");
        try {
          const res = await userApi.checkEmail(value);
          res.status === 200 && setErrorMessage("");
        } catch (err) {
          setErrorMessage("이미 가입된 이메일입니다.");
        }
      } else {
        setErrorMessage("이메일 형식이 올바르지 않습니다.");
      }
    } else if (name === "password") {
      const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
        value
      );
      /*  조건1. 6~20 영문 대소문자
                조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함  
            */
      setValidated({ ...validated, [name]: passwordVal });
      if (value === "") setErrorMessage("");
      else if (passwordVal) {
        setErrorMessage("");
      } else {
        setErrorMessage("6-20글자 숫자 혹은 특수 문자를 포함해야 합니다.");
      }
    } else if (name === "passwordCheck") {
      const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
        value
      );
      const passwordCheckVal = value === inputValue.password;
      if (value === "") {
        setErrorMessage("");
      } else if (passwordVal && passwordCheckVal) {
        setErrorMessage("");
      } else {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      }
    } else if (name === "nickname") {
      try {
        const res = await userApi.checkNickname(value);
        res.status === 200 && setErrorMessage("");
      } catch (err) {
        setErrorMessage("이미 사용중인 닉네임입니다.");
      }
    }
  });

  const handleSignup = async (e) => {

    const valResult = Object.values(validated).every((el) => {
      return el === true;
    });
    if (valResult) {
      const signInputValue = { ...inputValue };
      delete signInputValue.passwordCheck;

      try {
        const res = await userApi.signup(signInputValue);
        res.status === 200 && setIsOnVerification(true);
        navigate("/", { replace: true });
      } catch (err) {
        setErrorMessage("정보를 확인해주세요1");
      }
    } else {
      setErrorMessage("정보를 확인해주세요");
    }
  };

  const handleSignKakao = () => {
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
      <SignupWraper>
        <Tag>
          회원가입
        </Tag>
        <form className="SignupInputContainer">
          <div>
            <div>
              <SignupInput
                name="email"
                type="text"
                autoComplete="username"
                placeholder="이메일"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <SignupInput
                name="nickname"
                type="text"
                autoComplete="username"
                placeholder="닉네임"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <SignupInput
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="비밀번호"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <SignupInput
                name="passwordCheck"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호 확인"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div>{errorMessage}</div>
        <GenSignup className="generalSignup" onClick={handleSignup}>
          회원가입
        </GenSignup>
        <Social>
          <Kakao className="kakao" onClick={handleSignKakao}>
            <RiKakaoTalkFill/>
            카카오 회원가입
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
        <GenBtn>
          <Btn onClick={() => navigate("/", { replace: false })}>홈으로</Btn>
          <Btn onClick={() => navigate("/login", { replace: false })}>
            로그인
          </Btn>
        </GenBtn>
      </SignupWraper>
      {/* <FishingImg src={fishingImg} alt='fishingImg'/> */}
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
    </Container>
  );
}

export default Signup;