import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UpdateFish from './UpdateFish'
// import  { axiosFishBoard }  from '../../../redux'
import { targetFind } from '../../../redux/store/actions'




const Div = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem;
`

const Img = styled.img`
    width: 10vw;
`


function FishList({fish_name, src, size, createdAt, fishId, ranked, myFishBoard, userInfo, result, targetFind,render,rerender}) {
  
    axios.defaults.withCredentials = true;
      
    console.log(userInfo, "유저정보")
    console.log(myFishBoard.data, '데이터')
  

    const selectFish = () => {   
        if(userInfo.isLogin === true) {  
            return myFishBoard.data.data.result.find(el => el.fishId === fishId) 
        }
    }     
   
//* 수정
    const updateList = (fishInfo) => {
        console.log('수정')
        targetFind(fishInfo)
} 

    
//*삭제 //myFishBoard.data// 
    const deleteList = (fishInfo) => {
        console.log('삭제')
        let body = {fishId: fishId}
        axios({
            url: `https://localhost:5000/fish/board`,
            method: "delete",
            headers: {authorizationToken: userInfo.accessToken},
            data: {fishId}
          })
        .then(result => console.log(result))
        .catch(err => console.log(err)) 
        rerender(!render)
        
    }

    return (
        <>
        {userInfo.isLogin === false ?
            <Div>
                <Img src={src} />  
                <div>
                    <span>{fish_name}</span>              
                </div>    
                <div>
                    {size}cm
                </div> 
                <div>
                    {createdAt}
                </div> 
                <div>
                    {ranked}위
                </div> 
                <div>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </Div>
            :
            <Div>
                <Img src={src} />  
                <div>
                    <span>{fish_name}</span>              
                </div>    
                <div>
                    {size}cm
                </div> 
                <div>
                    {createdAt}
                </div> 
                <div>
                    {ranked}위
                </div> 
                <div>
                    <Link to='/updateFish'><button onClick={() => {updateList(selectFish)}}>수정</button></Link>
                    <button onClick={() =>deleteList(selectFish)}>삭제</button>
                </div>
            </Div>
        }
        </>   
    )
       
    
}
const mapStateToProps = (state) => {
    //console.log(state, "🤡")
    return {
        userInfo: state.userReducer,
        myFishBoard: state.fishBoardReducer
    }
}

const mapDispatchToProps =  {    
  
    targetFind: (fish) => targetFind(fish)
       
}
export default  connect(mapStateToProps,mapDispatchToProps)(FishList) 
