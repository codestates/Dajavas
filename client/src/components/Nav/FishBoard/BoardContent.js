import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react'
import axios from "axios";
import { connect } from 'react-redux'
import { addFish } from '../../../redux/fishBoard/actions'
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';


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



function BoardContent({state, addFish}) {
     useEffect(() => {
        console.log("rendering");
      },[]); 
    console.log(state, "🌸")

   
    axios.defaults.withCredentials = true;
    
    // 기록 하는곳 //* 기록을 입력해줄때 ranked를 왜써줬지..?

    const [photo, setPhoto] = useState(null)
    const [size, setSize] = useState(null)
    
    const fishList = ['선택해주세요','광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState(null)
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
   
   // sizeHandler
   const sizeHandler = (e) => {
       setSize(e.target.value)
       console.log(size)
   }

   // selectHandler
   const handleChangeSelect = (e) => {
        setFishName(e.target.value)
        console.log(fishName)
   }

   // ADD
   const submit = (e) => {
       e.preventDefault()
       if(!photo || !fishName || !size) {
        console.log(error)
        alert('모두 입력해주세요')
       } else {

        let body = addFish(photo, size, fishName)
        console.log(body.payload,"************")
        //console.log(record)
        // 저장되었다는 모달창 띄우자

        //토큰부터 보내자.. 토큰부터 보내고 포스트 요청을 받지 않나?
        //토큰인증함수가 post에는 빠져있는느낌..?    
     /*    axios.post('https://localhost:443/fish/board/1:/userId', body.payload, {
           headers :{ authorizationtoken: 'token'} // 토큰을 집어넣자
        })
        .then(result => console.log(result))
        .catch(error => console.log(error))     */
        
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
                        <select onChange={handleChangeSelect}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}

                        </select>
                    </div>
                    <div>     
                        <Span>크기</Span>
                        <input type='text' onChange={sizeHandler}></input><Span>cm</Span>
                    </div>
                </Fish>
                    <button>기록 저장</button>
            </form>   
        </Div>
       </> 
    )
}

const mapStateToProps = (state) => {
    console.log(state,'state')
    return {
        state: state.board
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addFish: (photo, size, fishName) => dispatch(addFish(photo, size, fishName))
         
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent)
