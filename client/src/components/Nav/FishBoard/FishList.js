import React from 'react'
import styled from 'styled-components';
import photo from '../../../img/월척.png'

const Div = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem;
`

const Img = styled.img`
    width: 10vw;
`


function FishList() {
    return (
        <Div>
            <Img src={photo} />
            <div>
                <span>어종 선택 </span>
                <select>
                    <option>도다리</option>
                    <option>광어</option>
                    <option>돔</option>
                    <option>우럭</option>
                    <option>도다리</option>
                </select>
            </div>    
            <div>크기</div>
            <div>날짜</div>
            <div>랭킹</div>
            <div>
                <button>수정</button>
                <button>삭제</button>
            </div>
        </Div>
       
    )
}

export default FishList
