import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userApi from "../../API/user";
import mypageApi from "../../API/mypage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import Wave from "react-wavify";
import {
  updateInfoAction,
  confirmModalOnAction,
  logoutAction
} from "../../redux/store/actions";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vw;
`
const MyPageWrapper=styled.div`
  padding: 5rem;
  border: 4px  red;
  display: flex-block; 
  justify-content: center;
  align-items: center;
`
const Tag = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 3rem;
`
const Div = styled.div`
  flex-direction: column;
  margin: 1rem;
  font-size: 2rem;
  font-weight: 400;
`
const Text = styled.div`
  justify-content: center;
  align-items: center;
  padding: 5rem;
  border: 20px solid #2AA1B7;
  border-radius: 0.8rem;
  font-size: 20px;
`
const LoginLink = styled(NavLink)`
  text-decoration: none;
`

const MypageInput = styled.input`
  outline: none; /* outline 테두리 없애기 */
  border:0 ;
  background-color: #E8F0FE;
  border-radius: 0.5rem;
  width: 20rem;
  padding: 1rem;
  margin: 0.5rem;
  font-size: 15px;
`
const ChangeDiv = styled.div`
`
const CancelDiv = styled.div`
  flex-direction: column;
`

const Email = styled.div`
  display: flex ;
  padding-left: 2rem;
`
const Nickname = styled.div`
  display: flex;
  padding-left: 2rem;
`
const Btn = styled.button`
  border: 3px solid #2AA1B7;
  outline: none;
  border-radius: 0.4rem;
  min-height: 3rem;
  min-width: 10rem;
  margin: 3rem;
  background-color: white;
  font-size: 20px;
  color: #2AA1B7;
  &:hover{
    cursor: pointer;
    background-color: #2AA1B7;
    color: white
  }
`
const Btn2 = styled.button`
  border: 3px solid #2AA1B7;
  outline: none;
  border-radius: 0.4rem;
  min-height: 3rem;
  min-width: 10rem;
  margin: 1rem;
  background-color: white;
  font-size: 20px;
  color: #2AA1B7;
  &:hover{
    cursor: pointer;
    background-color: #2AA1B7;
    border: none;
    color: white
  }
`
const Btn3 = styled.button`
  border: 3px white;
  outline: none;
  border-radius: 0.4rem;
  min-height: 3rem;
  min-width: 22rem;
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

function MyPage({ type }) {
  const { isLogin, login_method, email, nickname, password, accessToken } =  useSelector(({ userReducer }) => userReducer);
  /* const { isConfirmModal } = useSelector(({modalReducer}) => modalReducer);
 */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [socialMessage, setSocialMessage] = useState(""); //소셜로그인은 비밀번호 변경이 되지 않습니다.
  // const [isDisabled, setIsDisabled] = useState(true);
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
      } else if (value === nickname ) {
        setErrorMessage("변경사항이 없습니다.");
      } else {
        try {
          const res = await userApi.checkNickName(value);
          res.status === 200 && 
          setErrorMessage("");
        } catch (err){
          console.log(err); 
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
    formData.append('email', email)


      await mypageApi.modifyUserInfo(
        accessToken,
        formData
      ).then((result) => {
        dispatch(updateInfoAction(result.data));
        setIsEditMode(false);
      })

  };

  const handleCancelClick = (prev) => ({
    ...prev
  });

  const handleLogout = async() => {
    try{
      const res = await mypageApi.logoutUserInfo(accessToken);
      if(res.status === 200){
        dispatch(logoutAction)
        navigate("/", {replace: true});
      }
    } catch(err){
      console.log(err);
    }
  }

  const handleDeleteAccount = async() => {
    try{
      const res = await mypageApi.deleteUserInfo(email, login_method, accessToken);
      if(res.status === 200){
        navigate("/", {replace: true});
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const logoutContent = {
  //   title: '로그아웃 하시겠습니까?',
  //   body: '로그인 정보가 사라집니다.',
  //   func: () => {
  //     handleLogout();
  //   }
  // }

  // const modifyContent = {
  //   title: '회원정보를 수정하시겠습니까?',
  //   body: '변경하신 정보를 확인해주시기 바랍니다.',
  //   func: () => {
  //     handleSubmit();
  //   }
  // }

  /* const deleteContent = {
    title: '회원탈퇴를 하시겠습니까?',
    body: '지금까지의 기록이 삭제됩니다.',
    func: () => {
      handleDeleteAccount();
    }
  } */

  const func = () => {
    dispatch(confirmModalOnAction);
  }

  useEffect((accessToken, email, isLogin, password, inputValue) => {
    if(!isLogin){
      return 
    } else{
      const checkMyPage = async () => {
        const res = await mypageApi.getUserInfo(email, accessToken);
        setInputValue({
          nickname: res.data.nickname,
          password: password,
          passwordCheck: password,
        });
      };
      checkMyPage();
      console.log('유즈이펙트 인풋',inputValue)
    }
  }, []);


  return (
    <Container>
      <Tag>
        회원정보
      </Tag>
      <MyPageWrapper>
        {isLogin === false ? (
          <Text>
            <Div> 로그인이 필요한 서비스입니다 </Div>
            <Btn>
              <LoginLink to="/login">로그인</LoginLink>
            </Btn>
          </Text>
        ) : isEditMode === true ? (
          <>
            <form onSubmit={handleSubmit}>
              <Div>
                <MypageInput
                  name="email"
                  type="text"
                  placeholder="이메일"
                  defaultValue={email}
                  readOnly
                />
              </Div>
              <Div>
                <MypageInput
                  name="nickname"
                  type="text"
                  placeholder="닉네임"
                  defaultValue={nickname}
                  onChange={handleInputChange}
                />
              </Div>
              <Div>
                <MypageInput
                  name="password"
                  type="text"
                  placeholder="비밀번호"
                  defaultValue={password}
                  onChange={handleInputChange}
                />
              </Div>

              <Div>
                <MypageInput
                  name="passwordCheck"
                  type="text"
                  placeholder="비밀번호 확인"
                  defaultValue={password}
                  onChange={handleInputChange}
                />
              </Div>
              <Div>{errorMessage}</Div>
              <Div>{socialMessage}</Div>
              <button id='submitdata' style={{display:'none'}}></button>
            </form>
            <ChangeDiv>
              <Btn2
                onClick={()=>{
                  setInputValue(handleCancelClick);
                  setIsEditMode(false);
                }}
                >
                취소
              </Btn2>
              <Btn2>
                <label
                  htmlFor='submitdata'
                  type='submit'
                  >
                  저장
                </label>
              </Btn2>
            </ChangeDiv>
            <CancelDiv>
              <div>
                <Btn3
                  type='button'
                  className="logout"
                  onClick={handleLogout}
                >
                  로그아웃
                </Btn3>
              </div>
              <div>
                <Btn3
                  type='button'
                  className="delete"
                  onClick={handleDeleteAccount}
                >
                  회원탈퇴
                </Btn3>
              </div>
            </CancelDiv>
          </>
        ) : (
          <>
            <Text>
              <Email>
                <Div>email: </Div>
                <Div>{email}</Div>
              </Email>
              <Nickname>
                <Div>닉네임: </Div>
                <Div>{nickname}</Div>
                {/* <Div>{password}</Div> */}
              </Nickname>
                <Btn
                  onClick={() => {
                    setIsEditMode(true)
                  }}
                >
                  수정
                </Btn>
                {/* <button>로그아웃</button>
                <button>회원탈퇴</button> */}
            </Text>
          </>
        )}
        {/* {isConfirmModal && <ConfirmModal content={deleteContent} />} */}
      </MyPageWrapper>
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

export default MyPage;
