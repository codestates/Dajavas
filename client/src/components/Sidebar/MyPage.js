import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import userApi from "../../API/user";
import mypageApi from "../../API/mypage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
// import handleInputChange from '../Login/Signup'

import {
  loginAction,
  updateInfoAction,
  confirmModalOnAction,
  modalOffAction,
} from "../../redux/store/actions";

function MyPage({ type }) {
  const { isLogin, login_method, email, nickname, password, accessToken } =
    useSelector(({ userReducer }) => userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [socialMessage, setSocialMessage] = useState(""); //소셜로그인은 비밀번호 변경이 되지 않습니다.
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: email,
    nickname: nickname,
    password: password,
    passwordCheck: password,
  });

  const [validated, setValidated] = useState({
    nickname: true,
    password: true,
    passwordCheck: true,
  });

  const handleInputChange = debounce(async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });

    if (name === "nickname") {
      if (value === "") {
        setErrorMessage("");
      } else if (value === { nickname }) {
        setErrorMessage("변경사항이 없습니다.");
      } else {
        try {
          const res = await userApi.checkNickName(value);
          res.status(200) && setErrorMessage("");
        } catch {
          setErrorMessage("이미 사용중인 닉네임입니다.");
        }
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
    } else {
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
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", inputValue.nickname);
    formData.append("password", inputValue.password);
    try {
      const res = await mypageApi.modifyUserInfo(
        email,
        login_method,
        accessToken,
        formData
      );
      dispatch(updateInfoAction(res));
      setIsEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkMyPage = async () => {
      const res = await mypageApi.getUserInfo(email, accessToken);
      setInputValue({
        nickname: res.data.nickname,
        password: res.data.password,
        passwordCheck: res.data.password,
      });
    };
    checkMyPage();
  }, []);

  return (
    <>
      MyPage
      {isLogin === false ? (
        <>
          <div> 로그인이 필요한 서비스입니다 </div>
          <div>
            <Link to="/login">로그인페이지로 이동</Link>
          </div>
        </>
      ) : isEditMode === true ? (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                type="text"
                placeholder="이메일"
                defaultValue={email}
                readOnly
              />
            </div>
            <div>
              <input
                name="nickname"
                type="text"
                placeholder="닉네임"
                defaultValue={nickname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="text"
                placeholder="비밀번호"
                defaultValue={password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <input
                name="passwordCheck"
                type="text"
                placeholder="비밀번호 확인"
                defaultValue={password}
                onChange={handleInputChange}
              />
            </div>
            <div>{errorMessage}</div>
            <div>{socialMessage}</div>
          </form>
        </>
      ) : (
        <>
          <div>{email}</div>
          <div>{nickname}</div>
          {/* <div>{password}</div> */}
        </>
      )}
      <>
        <button
          onClick={() => {
            setIsEditMode(true) && setIsDisabled(false);
          }}
        >
          수정
        </button>
        <button>로그아웃</button>
        <button>회원탈퇴</button>
      </>
    </>
  );
}

export default MyPage;
