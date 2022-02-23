import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
// import  { axiosFishBoard }  from '../../../redux'
import UpdateFishList from './UpdateFishList'; 


const Div = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem;
`

const Img = styled.img`
    width: 10vw;
`


function FishList({fish_name, src, size, createdAt, id, ranked, myFishBoard, userInfo, result}) {
   /*  console.log(props, '프롭스')
    const {fish_name, src, size, createdAt, id, ranked, myFishBoard, userInfo} = props */
    console.log(myFishBoard.data, '데이터')
    console.log(userInfo, "유저정보")
  console.log(result,"리절트입니다.")
   
    // 수정
    const update = () => {
        console.log('수정')
        /*  axios.update(`https://localhost:443/fish/board/${userInfo.id}`, {
            headers :{ authorizationtoken: userInfo.accessToken}
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))  */
    }

    //삭제
    const deleteList = (id) => {
        console.log('삭제')
      /*   const  dd =myFishBoard.filter(el => el.id !== id ) 
        console.log(dd) */
      /*   axios.delete(`https://localhost:443/fish/board/${userInfo.id}`,{dd}, {
        headers :{ authorizationtoken: userInfo.accessToken}
        })
        .then(result => console.log(result))
        .catch(err => console.log(err)) */
        
        
    }

    return (
        <Div>
          
            <Img src={src} />  
            <div>
                <span>{fish_name}</span> 
              
            </div>    
            <div>{size}cm</div> 
            <div>{createdAt}</div> 
            <div>{ranked}위</div> 
            <div>
                <Link to='/updateList'><button onClick={update}>수정</button></Link>
                <button onClick={() => deleteList(id)} >삭제</button>
            </div>
    
        </Div>
       
    )
}
const mapStateToProps = (state) => {
    //console.log(state, "🤡")
    return {
        userInfo: state.userReducer,
        myFishBoard: state.fishBoardReducer
    }
}

const mapDispatchToProps = (dispatch) =>  {    
   return {
          /*  axiosFishBoard: () => dispatch(axiosFishBoard) */
        }
}
export default  connect(mapStateToProps,mapDispatchToProps)(FishList) 
