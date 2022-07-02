import React from "react";
import { useState } from "react";
import styled from "styled-components";
import UpdateBoardContent from "../Nav/FishBoard/UpdateBoardContent";
import { useNavigate } from "react-router-dom";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  height: 70vh;
  width: 60vw;
  border-radius: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  text-decoration: none;
  font-size: x-large;
  font-weight: bolder;
  border: none;
  padding: 20px;
  color: #0e3b5b;
  border-radius: 30px;
  cursor: grab;
  &:hover {
    color: coral;
    cursor: pointer;
  }
`;
const Div = styled.div`
  background-color: #ebf1f1;
  border-radius: 3%;
  border: gray 0.1px solid;
  box-shadow: 0 10px 25px #3c4a5645;
`;
const Title = styled.title`
  display: flex;
  justify-content: flex-end;
`;
const Text = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  color: #8bbac2;
  padding-bottom: 15px;
`;

function UpdateFishModal() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const openModalHandler = () => {
    setOpen(!open);
    navigate(-1);
  };

  return (
    <div>
      {open === false ? (
        <ModalBackdrop>
          <ModalContainer>
            <Div>
              <div>
                <Title>
                  <div></div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Btn onClick={openModalHandler}>X</Btn>
                  </div>
                </Title>
                <Text>수정</Text>
                <UpdateBoardContent />
              </div>
            </Div>
          </ModalContainer>
        </ModalBackdrop>
      ) : null}
    </div>
  );
}

export default UpdateFishModal;
