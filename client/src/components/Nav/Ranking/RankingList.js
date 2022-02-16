import React from 'react'
import photo from '../../../img/월척.png'
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem;
`
const Img = styled.img`
    width: 10vw;
`

function RankingList() {    
    return (
        <Div>
            <Img src={photo} />
            <div>닉네임</div>
            <div>크기</div>
            <div>날짜</div>
        </Div>
    )
}

export default RankingList
