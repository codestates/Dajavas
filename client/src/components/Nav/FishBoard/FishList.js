import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'
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


function FishList({fish_name, src, size, createdAt, id, ranked, myFishBoard, userInfo, result, updateList}) {
   /*  console.log(props, '프롭스')
    const {fish_name, src, size, createdAt, id, ranked, myFishBoard, userInfo} = props */
    console.log(myFishBoard.data, '데이터')
    console.log(userInfo, "유저정보")
    console.log(result,"리절트입니다.")
    console.log(updateList, '업뎃리스트')

    const  selectFish =result.data.find(el => el.id === id)  
   
//* 수정
   /*  const updateList = (fishInfo) => {
        console.log('수정')  //userInfo
        //result.date => myFishBoard.data로 바꿔주어야함
        
        console.log(fishInfo) */
        
        /*  axios.update(`https://localhost:443/fish/board/${userInfo.id}`,{} {
            headers :{ authorizationtoken: userInfo.accessToken}
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))  */


//수정버튼을 누르면 수정부분의 수정모달컴포넌트(이컴포넌트에 updataFish정보 넘겨주기)가 발생한다. 들어간다. 

    //}

    
//*삭제 //myFishBoard.data// 
    const deleteList = (fishInfo) => {
        console.log('삭제')
        console.log(fishInfo) 
      /*   axios.delete(`https://localhost:443/fish/board/${userInfo.id}`,{id: deleteFish.id}, {
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
                <Link to='/updateFish'><button onClick={() =>updateList(selectFish)}>수정</button></Link>
                <button onClick={() => deleteList(selectFish)}>삭제</button>
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

const mapDispatchToProps =  {    
  
    /*  axiosFishBoard: () => dispatch(axiosFishBoard) */
    updateList: (fish) => targetFind(fish)
       
}
export default  connect(mapStateToProps,mapDispatchToProps)(FishList) 
