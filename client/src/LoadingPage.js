import React from 'react'
import styled from 'styled-components'
//import styled, { keyframes } from 'styled-components';

const Div = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    height: 100vh;
    background-color: wheat;
`

const Load = styled.h1`
    font-size: 2rem;
    color: #fff;
    position: relative;
    &::before {
        content: attr(data);
        color:black;
        position:absolute;
        left:0;
        z-index: 2;
        overflow: hidden;
        width:100%;
        animation: loading, 5s, ease infinite;
    }
    &::after {
        content: "";
        height:4px;
        background-color: red;
        position:absolute;
        left:0;
        bottom: --10px;
        width:100%;
        animation: loading, 5s, ease infinite;
    }
`

function LoadingPage() {

 
    return (
        <Div>
            <Load >LOADING</Load>
        </Div>
    )
}

export default LoadingPage
