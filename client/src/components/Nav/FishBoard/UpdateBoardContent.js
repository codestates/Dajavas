import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react'
import axios from "axios";
import {connect} from 'react-redux'
import Modal from '../../Modal/Modal'
import { useNavigate } from "react-router-dom"



const Div = styled.div`
   /*  background-color: #ABCCFF; */
    height:60vh;
    width:50vw; 
`
const Day = styled.div`
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
const Btn = styled.button`
    background-color: #4087FE;
    text-decoration: none;
    border: none;
    padding: 20px;
    color: white;
    border-radius: 30px;
    cursor: grab;

`

function UpdateBoardContent({targetFish,userInfo,navigation}) {
   console.log(targetFish,userInfo)

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    
    // 기록 하는곳 
    const [record, setRecord] = useState(targetFish)
    const [photo, setPhoto] = useState(targetFish.src)
    const [size, setSize] = useState(targetFish.size)
    
    const fishList = ['변경안함','광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState(targetFish.fish_name)

  
   
   
   /*  // 오늘날짜
    let now = new Date()
    let year = now.getFullYear()
    let todayMonth = now.getMonth() + 1
    let today = now.getDate()
    const week = ['일', '월', '화', '수', '목', '금', '토']; 
    let dayOfWeek = week[now.getDay()]; */

    // 파일 업로드
    const firstImgHandle = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile.name)
        setPhoto(imageFile.name)
    }

//* aws연결해야함 *//
   
 


   // 수정
   const submit = (e) => {
        e.preventDefault()

        if(!photo || !fishName || !size) {          
            alert('모두 입력해주세요')
       }   
        if(fishName === '변경안함') {
            setRecord({
                ...record, 
                src: photo,
                size: size,
                ranked: 1
            //유저 아이디 보내줄건지...    
            })    
        }else {        
//* 저장되었다는 모달창 띄우자 그러고나면 네비게이트로 /record로 보내주기
            setRecord({
                ...record, 
                fish_name: fishName,
                src: photo,
                size: size,
                ranked: 1
        //유저 아이디 보내줄건지...    
        })   
            
        /* axios.post(`https://localhost:443/fish/board/1:/${userInfo.id}`, record, {
           headers :{ authorizationtoken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => console.log(result))
        .catch(error => console.log(error))  */     
         
    }
}
console.log(record,"수정된 정보이다.")
    return (
        <Div>
            <form  onSubmit={submit} >
                <File> 
                    <div>선택한 사진 주소: {photo}</div>   
                    <Photo>사진첨부</Photo>
                    <Input type='file' name='file' accept='image/*' onChange={firstImgHandle}/>    
                </File>
                <Fish>
                    <div>
                        <div>
                            내가 선택한 어종: {fishName}
                        </div>
                        <Span>어종 선택 </Span>
                        <select onChange={(e)=>setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                        </select>
                    </div>
                    <div>     
                        <Span>크기</Span>
                        <input type='text' value={size} onChange={(e)=>setSize(e.target.value)}></input><Span>cm</Span>
                    </div>
                </Fish>
                    <Btn onClick={() => navigate(-1)}>기록 저장</Btn>
            </form>   
        </Div>
    )
}

const mapStateToProps = (state) => {
    console.log(state,'++++++++++++++++++++++++') 
     return {
      targetFish: state.updateFishReducer.data,
      userInfo: state.userReducer    
    } 
}



export default connect(mapStateToProps)(UpdateBoardContent)
