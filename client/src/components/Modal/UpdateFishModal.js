import React from 'react'
import { useState } from 'react'
import styled from 'styled-components';
import UpdateBoardContent from '../Nav/FishBoard/UpdateBoardContent';
import { useNavigate } from "react-router-dom"

const ModalBackdrop = styled.div`
position: fixed;
z-index: 999;
top: 0;
left: 0;
bottom: 0;
right: 0; 
background-color: rgba(0,0,0,0.4);
display: grid;
place-items: center;
`;


const ModalContainer = styled.div`
    height: 70vh;
    width: 60vw;
    border: solid 2px #ABCCFF;
    background-color:#ABCCFF ;
    border-radius: 12%;
    display: flex; 
    justify-content: center;
    align-items: center;
  
`
const Btn = styled.button`
    background-color: #4087FE;
    text-decoration: none;
    border: none;
    padding: 20px;
    color: white;
    border-radius: 30px;
    cursor: grab;

`


function UpdateFishModal() {
    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false)
    const openModalHandler = () => {
        setOpen(!open)
        navigate(-1)
    }


    return (
        <div>
            {open === false  ? (
                <ModalBackdrop>
                    <ModalContainer>
                    <div>
                        <div>
                        {/* <h1>수정</h1> */}
                        <UpdateBoardContent />   
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>                               
                            <Btn onClick={openModalHandler}>닫기</Btn>
                        </div>
                    </div>
                    
                    </ModalContainer>
                </ModalBackdrop>
                )
                : null 
            }     
        </div>
    )
    
}

export default UpdateFishModal
