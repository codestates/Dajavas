import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react'
import axios from "axios";
import {connect} from 'react-redux'




const Div = styled.div`
   /*  background-color: #ABCCFF;
    height:100vh;
    width:100vw; */
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



function BoardContent({userInfo}) {
  
   

   
    axios.defaults.withCredentials = true;
    
    // 기록 하는곳 //* 기록을 입력해줄때 ranked를 왜써줬지..?
    const [record, setRecord] = useState({})
    const [photo, setPhoto] = useState('')
    const [size, setSize] = useState('')
    
    const fishList = ['선택해주세요','광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState('')
    const [error, setError] = useState('모두 기록해주세요')
  
   
   
    // 오늘날짜
    let now = new Date()
    let year = now.getFullYear()
    let todayMonth = now.getMonth() + 1
    let today = now.getDate()
    const week = ['일', '월', '화', '수', '목', '금', '토']; 
    let dayOfWeek = week[now.getDay()];

    // 파일 업로드
    const firstImgHandle = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile.name)
        setPhoto(imageFile.name)
    }

//* aws연결해야함 *//
   
 


   // ADD
   const submit = (e) => {
       e.preventDefault()
       if(!photo || !fishName || !size) {
        console.log(error)
        alert('모두 입력해주세요')
       } else {    
        
//* 저장되었다는 모달창 띄우자 그러고나면 네비게이트로 /record로 보내주기

        setRecord({ 
            fish_name: fishName,
            src: photo,
            size: size
        })   
            
        axios.post(`https://localhost:443/fish/board/1:/${userInfo.id}`, record, {
           headers :{ authorizationtoken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => console.log(result))
        .catch(error => console.log(error))      
         
    }
}


    return (
        <>
        <h1>기록</h1>
        <Div>
            <form  onSubmit={submit} >
                <Day>
                    {year}년 {todayMonth}월 {today}일 {dayOfWeek}요일
                </Day>
                <File>    
                    <Photo>사진첨부</Photo>
                    <Input type='file' name='file' accept='image/*' onChange={firstImgHandle}/>    
                </File>
                <Fish>
                    <div>
                        <Span>어종 선택 </Span>
                        <select onChange={(e)=>setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                        </select>
                    </div>
                    <div>     
                        <Span>크기</Span>
                        <input type='text' onChange={(e)=>setSize(e.target.value)}></input><Span>cm</Span>
                    </div>
                </Fish>
                    <button>기록 저장</button>
            </form>   
        </Div>
       </> 
    )
}

const mapStateToProps = (state) => {
     console.log(state,'++++++++++++++++++++++++') 
      return {
        userInfo: state.userReducer, // 여기서 user의 id를 뽑아와야한다.
        
     } 
 }

const mapDispatchToProps = {
   
}



export default connect(mapStateToProps,mapDispatchToProps)(BoardContent)
