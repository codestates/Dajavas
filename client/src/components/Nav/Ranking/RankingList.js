import React from 'react'
import photo from '../../../img/월척.jpg'
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin:0 10rem;
    margin-top: 3rem;
    border: 0;
    border-radius: 1%;
    padding-top:5px;
    padding-bottom: 5px;
    box-shadow: 0 10px 25px #3c4a5645;
    background-color: rgb(222, 247, 243);
`
const Img = styled.img`
    width: 7vw;
    height: 10vh;
    border: solid #EEE9BE 3px;
    border-radius: 5%;
    background-color: #EBF1F1;
    padding:10px;
`
const Text = styled.div`
    font-size: 1.3rem;
    font-weight: bolder;
    color: gray;
    opacity: 4;
    
`
function RankingList({src, createdAt, size ,nickname, fish_name, ...rest}) {   
    
    
    return (
        <Div>
        {size === undefined ? 
        <>
            <Img src={photo} />
            <Text>랭킹에 도전해보세요</Text>
            <Text></Text>
        </>    
            
        :
        <>
            <Img src={src} />
            <Text>{nickname}</Text>
            <Text>{size}cm</Text>
            
        </>
        
        }    
        </Div>
    )
}

export default RankingList
