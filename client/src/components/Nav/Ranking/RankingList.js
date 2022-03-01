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

function RankingList({src, createdAt, size ,nickname, fish_name}) {    
    
    return (
        <Div>
        {size === undefined ? 
            <>
            <Img src={photo} />
            <h4>랭킹에 도전해보세요</h4>
            </>    
            
        :
        <>
            <Img src={src} />
            <div>{nickname}</div>
            <div>{size}cm</div>
            
        </>
        
        }    
        </Div>
    )
}

export default RankingList
