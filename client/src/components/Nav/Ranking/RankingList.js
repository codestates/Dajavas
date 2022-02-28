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

function RankingList({src, createdAt,size}) {    
    return (
        <Div>
            <Img src={src} />
            <div>닉네임</div>
            <div>{size}</div>
            <div>{createdAt}</div>
        </Div>
    )
}

export default RankingList
