import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  border: teal 3px solid;
  &:hover {
    background-color: rgb(247, 210, 207);
  }
`;
const ImgDiv = styled.div`
  width: 100px;
  height: 100px;
  /* border: red 2px solid; */
  box-sizing: border-box;
  width: 50%;
`;
const Img = styled.img`
  box-sizing: border-box;
  width: 99.9%;
  height: 100%;
`;

const ContentDiv = styled.div`
  /* border-left: solid 1px gray;  */
  box-sizing: border-box;
  width: 50%;
  box-shadow: 0 10px 25px #3c4a5645;
`;
const Content = styled.div`
  margin-top: 10px;
  margin-left: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  display: flex;
  justify-content: flex-start;
  opacity: 0.7;
`;
function FishDataList(props) {
  return (
    <Div>
      <ImgDiv>
        <Img src={props.img} />
      </ImgDiv>
      <ContentDiv>
        <Content>이름: {props.name}</Content>
        <Content>분류: {props.group}</Content>
        <Content>방생기준: {props.standard}</Content>
      </ContentDiv>
    </Div>
  );
}

export default FishDataList;
