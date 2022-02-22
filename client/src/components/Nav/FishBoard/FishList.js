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


function FishList(props) {
    console.log(props, '프롭스')
    const {fish_name, src, size, createdAt, id, ranked} = props
  
   
    // 수정
    const update = () => {
        console.log('수정')
     /*    axios.update(`https://localhost:443/fish/board/${userId}`, {
            headers :{ authorizationtoken: '토큰담기(redux)'}
        })
        .then(result => console.log(result))
        .catch(err => console.log(err)) */
    }

    //삭제
    const deleteList = () => {
        console.log('삭제')
      /*   axios.delete(`https://localhost:443/fish/board/${userId}`, {
        headers :{ authorizationtoken: '토큰담기(redux)'}
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
                <button onClick={deleteList}>삭제</button>
            </div>
    
        </Div>
       
    )
}
// const mapStateToProps = (state) => {
//     console.log(state, "🤡")
//     return {
//         state
//     }
// }

// const mapDispatchToProps = (dispatch) =>  {    
//    return {
//            axiosFishBoard: () => dispatch(axiosFishBoard)
//         }
// }
export default /* connect(mapStateToProps,mapDispatchToProps)(FishList) */ FishList
