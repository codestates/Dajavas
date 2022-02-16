import React from 'react'
import { Link } from 'react-router-dom';
import FishList from './FishList'
import styled from 'styled-components';

const Div = styled.div`
    height: 100vh;
    width:100vw;
    margin-bottom: 2rem;
    margin-top: 1rem;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
    
`
const Btn = styled.button`
    width:10em;
    height:5em;
    
`


function FishBoard() {
    return (
        <Div>
            <Title>
            <h1>나의 월척~</h1>
            <Btn><Link to='/record' style={{ textDecoration: 'none', color: 'black',fontWeight:'bolder' }}>기록하기</Link></Btn>
            </Title>
            <FishList/>
            <FishList/>
            <FishList/>
            
        </Div>
    )
}

export default FishBoard
