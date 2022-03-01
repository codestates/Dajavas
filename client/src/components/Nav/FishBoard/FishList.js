import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UpdateFish from './UpdateFish'
// import  { axiosFishBoard }  from '../../../redux'
import { targetFind } from '../../../redux/store/actions'
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../../Modal/Modal';
import { useNavigate } from "react-router-dom"
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";



const Div = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem;
    
`

const Img = styled.img`
    width: 10vw;
`


const Box = styled.div`
    margin-right:10px;
`


function FishList({fish_name, src, size, createdAt, fishId, ranked, myFishBoard, userInfo, result, targetFind,render,rerender}) {
  
    axios.defaults.withCredentials = true;
      
    console.log(userInfo, "유저정보")
    console.log(myFishBoard.data, '데이터')
  

    const selectFish = () => {   
        if(userInfo.isLogin === true) {  
            return myFishBoard.data.data.realResult.find(el => el.fishId === fishId) 
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
        /* let body = {fishId: fishId} */
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
    
    const navigate = useNavigate();
    const goHome = () => {
        
        alert('로그인을 하세요')
        navigate('/login')
    }

    const date = createdAt.slice(0,10)

    const ranking = () => {
        if(ranked === 1) {
            return <><FontAwesomeIcon icon={faCrown} size="2x" color='gold'/></>
        } else {
            return <></>
        }
    }
    
    return (
        <>
        {userInfo.isLogin === false ?
            <Div>
                <Img src={src} />  
                <div>
                    {fish_name}             
                </div>    
                <div>
                    {size}cm
                </div> 
                <div>
                    {createdAt}
                </div> 
                <div>   
                    {ranking()}
                </div> 
                <Div>
                    <Box>
                    <FontAwesomeIcon onClick={goHome} icon={faPencil} size="2x" color='skyblue' margin='10px'/> 
                    </Box>
                    <Box>
                    <FontAwesomeIcon onClick={goHome} icon={faTrashCan} size="2x" color='skyblue'/>
                    </Box>
                        
                </Div>
            </Div>
            :
            <Div>
                <Img src={src} />  
                <div>
                    {fish_name}           
                </div>    
                <div>
                    {size}cm
                </div> 
                <div>
                    {date}
                </div> 
                <div>    
                    {ranking()}
                </div> 
                <Div>
                
                    <Box>
                    <Link to='/updateFish'><FontAwesomeIcon onClick={() => {updateList(selectFish)}} icon={faPencil} size="2x" color='skyblue'/></Link> 
                    </Box>
                    <Box>
                    <FontAwesomeIcon onClick={() =>deleteList(selectFish)}icon={faTrashCan} size="2x" color='skyblue'/>
                    </Box>
                        
                </Div>
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
