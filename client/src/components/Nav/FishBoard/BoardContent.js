import React from 'react'
import styled from 'styled-components';


const Div = styled.div`
   /*  background-color: #ABCCFF;
    height:100vh;
    width:100vw; */
`
const Date = styled.div`
    border: dotted black 2px;
    margin: 1rem;
    padding: 1rem;

`
const File = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid green;
    margin: 0 1rem;

`
const Input = styled.input`
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Photo = styled.div`
    border: dotted red 2px; 
    margin:0.8rem;
    padding:2rem;
    width: 20rem;
    height: 5rem; 
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const Fish = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 1rem;
    margin: 1rem;
    border: dotted black 2px;
    
`
const Span = styled.span`
    margin: 0.3rem;
`

function BoardContent() {
    return (
        <>
        <h1>기록</h1>
        <Div>
            <Date>
                날짜
            </Date>
            <File>    
                <Photo>사진첨부</Photo>
                <Input type='file' name='file' accept='image/png, image/jpeg'/>    
            </File>
            <Fish>
                <div>
                    <Span>어종 선택 </Span>
                    <select>
                        <option>도다리</option>
                        <option>광어</option>
                        <option>돔</option>
                        <option>우럭</option>
                        <option>도다리</option>
                    </select>
                </div>
                <div>     
                    <Span>크기</Span>
                    <input type='text'></input><Span>cm</Span>
                </div>
            </Fish>
        </Div>
       </> 
    )
}

export default BoardContent
