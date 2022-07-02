import React from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { sideBarOff } from "../../redux/store/actions";
import { useEffect } from "react";

const Container = styled.div`
  width: 7vw;
  background-color: #d8d7d8;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  height: 100%;
  top: 0;
  border-bottom: 1px solid red;
  display: ${(props) => (props.btnClicked ? "block" : "none")};
`;

const Div = styled.div`
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 1rem 0;
  text-decoration: none;
  transition: background-color, color 100ms ease-out;
  color: #2aa1b7;
  font-size: 16px;
  font-weight: bolder;

  :hover {
    color: antiquewhite;
    background-color: #2aa1b7;
  }
`;
const Menu = styled.div`
  ${Div} :hover & {
    color: #f3b178;
    background-color: #2aa1b7;
  }
  font-size: 20px;
`;
const NickName = styled.div`
  font-weight: bolder;
  color: #2aa1b7;
`;

const Sidebar = ({ btn, setBtn }) => {
  const { isLogin, nickname } = useSelector(({ userReducer }) => userReducer);
  const dispatch = useDispatch();
  const side = useRef();

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (btn && (!sideArea || !sideCildren)) {
      dispatch(sideBarOff);
      setBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <Container btnClicked={btn} ref={side}>
      <Div>
        {isLogin === true ? (
          <>
            <NickName>{nickname}</NickName>
            <span style={{ color: "black", opacity: 0.7, fontWeight: "bold" }}>
              님
            </span>
            <div style={{ fontWeight: "bold", color: "black", opacity: 0.7 }}>
              반갑습니다
            </div>
          </>
        ) : (
          <Menu>
            <StyledNavLink to="/login">로그인</StyledNavLink>
          </Menu>
        )}
        <Menu>
          <StyledNavLink to="/mypage">마이페이지</StyledNavLink>
        </Menu>
        <Menu>
          <StyledNavLink to="/fishdata">물고기정보</StyledNavLink>
        </Menu>
        <Menu>
          <StyledNavLink to="/closedseason">금어기</StyledNavLink>
        </Menu>
        <Menu>
          <StyledNavLink to="/checklist">체크리스트</StyledNavLink>
        </Menu>
      </Div>
    </Container>
  );
};

export default Sidebar;
