import React from 'react'
import { useState } from 'react'
import styled from 'styled-components';


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
    width: 20rem;
    height: 20rem;
    border: solid 2px #ABCCFF;
    background-color:#EBF1F1 ;
    opacity: 0.8;
   
    border-radius: 12%;
    display: flex; 
    justify-content: center;
    align-items: center;
  
`
const Btn = styled.button`
    background-color: #8BBAC2;;
    text-decoration: none;
    border: none;
    padding: 20px;
    color: white;
    border-radius: 30px;
    font-weight: bolder;
    
    &:hover{
        cursor: pointer;
        background-color: coral;
        cursor: pointer;
    }
    box-shadow: 0 10px 25px #3c4a5645;

`


function Modal({text}) {

    const [open, setOpen] = useState(false)
    const openModalHandler = () => {
        setOpen(!open)
    }


    return (
        <div>
            {open === false  ? (
                <ModalBackdrop>
                    <ModalContainer>
                    <div>
                        <h2>
                            {text}
                        </h2>
                        <div onClick={(e) => e.stopPropagation()}>   
                            <Btn onClick={openModalHandler}>확인</Btn>
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

export default Modal
