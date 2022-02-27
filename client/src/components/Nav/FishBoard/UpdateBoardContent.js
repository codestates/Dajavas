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
   console.log(targetFish,'🤡',userInfo)

   const [isRedirect, setIsRedirect] = useState(false)

   axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    
    // 기록 하는곳 
    const [record, setRecord] = useState(targetFish)
    const [photo, setPhoto] = useState(record.src)
    const [size, setSize] = useState(record.size)
    
    const fishList = ['변경안함','광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState(record.fish_name)

  
   
  

    // 파일 업로드
    const firstImgHandle = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile.name)
        setPhoto(imageFile.name)
    }

//* aws연결해야함 *//
   
 


   // 수정
   const save = (e) => {
        e.preventDefault()

        if(!photo || !fishName || !size) {          
            alert('모두 입력해주세요')
       }   
        if(fishName === '변경안함') {
            setRecord({
                ...record, 
                src: photo,
                size: size,
                ranked: 1,
                userId: userInfo.id
              
            })    
        }else {        
//* 저장되었다는 모달창 띄우자 그러고나면 네비게이트로 /record로 보내주기
            setRecord({
                ...record, 
                fish_name: fishName,
                src: photo,
                size: size,
                ranked: 1,
                userId: userInfo.id
           
        })   
        
        axios({
            url: `https://localhost:5000/fish/board`,
            method: "put",
            headers: {authorizationtoken: userInfo.accessToken},
            data: record
        })
        .then(result => {
            console.log(result)
            console.log(record,"수정된 정보.")
            
        })
        .catch(err => console.log(err))               
         
    }

}
    const send = () => {
        navigate('/fishboard') 
        save()  
    }

    return (
        
        <Div>
            <form  onSubmit={save} >
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
                    <Btn onClick={save}>기록 저장</Btn>
                    <Btn onClick={send}>확인</Btn>
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
