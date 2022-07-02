import React from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Div = styled.div`
  border: 0;
  background-color: #ebf1f1;
  box-shadow: 0 10px 40px #3c4a5645;
  border-radius: 1%;
  margin: 2px;
  margin-right: 1rem;
  margin-left: 1rem;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const Input = styled.input`
  border: 0;
  border-radius: 6%;
  background-color: #ebf1f1;
  text-align: center;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bolder;
  font-size: x-large;
  color: #04a1a1;
  padding: 15px;
`;

const Title = styled.div`
  font-size: x-large;
  font-weight: bolder;
  color: #04a1a1;
  padding: 10px;
  padding-bottom: 0;
`;

const Loc = styled.div`
  opacity: 0.7;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Icon = styled.div`
  margin-right: 10px;
  padding: 3px;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: coral;
    opacity: 0.7;
  }
`;

function Like({
  location_name,
  long,
  lat,
  bookmarkList,
  id,
  userInfo,
  bookmark,
}) {
  const selectLocation = bookmarkList.find((el) => el.id === id);

  const [text, setText] = useState(false);
  const deleteList = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}map`,
      method: "delete",
      headers: { authorizationToken: userInfo.accessToken },
      data: { locationId: selectLocation.id },
    })
      .then((result) => {
        return;
      })
      .catch((err) => console.log(err));
    bookmark();
  };

  const patchList = () => {
    setText(!text);

    axios({
      url: `${process.env.REACT_APP_BASE_URL}map`,
      method: "patch",
      headers: { authorizationToken: userInfo.accessToken },
      data: {
        locationId: selectLocation.id,
        location_name: text,
      },
    })
      .then((result) => {
        return;
      })
      .catch((err) => console.log(err));
    bookmark();
  };
  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      {long !== undefined ? (
        <>
          {text === false ? (
            <Div>
              <Title>{location_name}</Title>
              <Loc>{lat}</Loc>
              <Loc>{long}</Loc>
              <IconContainer>
                <Icon>
                  <FaPencilAlt
                    onClick={() => patchList()}
                    color="skyblue"
                    margin="10px"
                  />
                </Icon>
                <Icon>
                  <FaTrashAlt onClick={() => deleteList()} color="skyblue" />
                </Icon>
              </IconContainer>
            </Div>
          ) : (
            <Div>
              <Input
                type="text"
                placeholder={location_name}
                onChange={onChange}
              />
              <Loc>{lat}</Loc>
              <Loc>{long}</Loc>
              <IconContainer>
                <Icon>
                  <FaPencilAlt
                    onClick={() => patchList()}
                    color="skyblue"
                    margin-right="10px"
                  />
                </Icon>
                <Icon>
                  <FaTrashAlt onClick={() => deleteList()} color="skyblue" />
                </Icon>
              </IconContainer>
            </Div>
          )}
        </>
      ) : (
        <Div>
          <Title>정보없음</Title>
        </Div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps)(Like);
