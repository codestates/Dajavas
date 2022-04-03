import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { modalOffAction } from '../../redux/store/actions';
import { useDispatch } from 'react-redux';

const ModalOverlay = styled.div`
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #1D1D21E5; 
  z-index: 999; */
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

const ModalWrapper = styled.div`
    border: 1px dashed green;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    border: 5px dashed blueviolet;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    color: pink;
    background-color: bisque;
    width: 20rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;



const Contents = styled.div`
    border: 1px dashed red;
    padding: 2rem 0.25rem;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Title = styled.div`
    border: 1px dashed red;
    margin-bottom: 1rem;
    font-size: 1.25rem;
`;

const Warning = styled.div`
    border: 1px dashed red;
    color: var(--color-gray);
    font-size: 0.925rem;
    line-height: 1.5;
`;

const ButtonContainer = styled.div`
    border: 1px dashed red;
    display: flex;
    height: 2.4rem;
    padding: 0 0.25rem;
    > * {
        font-size: 0.825rem;
        line-height: 1.4rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        width: 100%;
        height: 100%;
        margin-right: 0.5rem;
        :last-of-type {
        margin-right: 0;
        }
    }
`;

const CancelBtn = styled.button`
    border: 1px dashed red;
    color: red;
    background-color: whitesmoke;
    :hover {
        color: black;
        background-color: lightblue;
        opacity: 0.75;
    }
`;

const ConfirmBtn = styled.button`
    border: 1px dashed red;
    color: blueviolet;
    background-color: #88BECE;
    :hover {
        opacity: 0.75;
    }
`;

export const ConfirmModal = ({content}) => {
    const dispatch = useDispatch();
    const handleCancelClick = () => {
        dispatch(modalOffAction);
    };

    const handleConfirmClick = async () => {
        try{
            await content.func();
            dispatch(modalOffAction);
        } catch(err){
            console.log(err,'모달 확인창 눌렀을 때 에러발생')
        }
    };

    useEffect(() => {
        document.body.style.cssText = `
            position: fixed;
            top: -${window.scrollY}px;
            left: 0;
            right: 0;
        `;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = `
                position: static;
                top: unset;
                left: unset;
                right: unset;
            `;
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
        };
    }, []);

    return (
        <>
            <ModalOverlay >ConfirmModal</ModalOverlay>
            <ModalWrapper>
                <ModalContainer>
                    <Contents>
                        <Title>{content}</Title>
                        <Warning>{content}</Warning>
                    </Contents>
                    <ButtonContainer>
                        <CancelBtn onClick={handleCancelClick}>X</CancelBtn>
                        <ConfirmBtn onClick={handleConfirmClick}>O</ConfirmBtn>
                    </ButtonContainer>
                </ModalContainer>
            </ModalWrapper>
        </>
    )
};

