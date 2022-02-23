import React from 'react'
import { Link } from 'react-router-dom';
import FishList from './FishList'
import styled from 'styled-components';
import {connect} from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios';
import photo from '../../../img/월척.png'
import { fishBoard }from '../../../redux/store/actions/index'


const Div = styled.div`
    height: 100vh;
    width:100vw;
    margin-bottom: 2rem;
    margin-top: 1rem;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
    
`
const Btn = styled.button`
    width:10em;
    height:5em;
    
`


function FishBoard({userInfo, myFishBoard, fishBoard}) {
    useEffect(() => {
        fishBoard()
    },[]) 
    console.log(userInfo, myFishBoard, fishBoard, 'FishBoard props')
    
   
    axios.defaults.withCredentials = true;
       
//* 렌더링 시 로딩창나오게 하기 근데... 이거 시간 줘야하나?
     const loadingOrMyFishList = myFishBoard.loading ? (<div>loading...</div>) : (
          <div>
            {myFishBoard.data.map(el => (<div key={el.id}>
               <h3>{el.name}</h3>
                <p>{el.email}</p>
                <p>{el.body}</p>
                </div>
                ))
             }
            </div>
          
     )


    //    //* 요청이거 보내주기   
    //     axios.get(`https://localhost:443/fish/board/${userInfo.email}&&page?${page}`,{
    //       headers :{ authorizationtoken: userInfo.accessToken}
    //     })
    //     .then((result) => console.log(result)) 
    //     .catch(err => console.log(err))
    //     }
    //   const {fish_name, src, size, ranked, createdAt, id(수정삭제하려면 필요)) } = result.data
       
      


      const result = {data:[{fish_name: '도다리',ranked:57, src: photo, size: 5, createdAt:'20220220', id:3,  },
      {fish_name: '도다리',ranked:57, src: photo, size: 5, createdAt:'20220220', id:6,  },
      {fish_name: '도다리',ranked:57, src: photo, size: 5, createdAt:'20220220', id:11,  }
    ]}
    return (
        <Div>   
            <Title>
            <h1>나의 월척~</h1>
            <Btn><Link to='/record' style={{ textDecoration: 'none', color: 'black',fontWeight:'bolder' }}>기록하기</Link></Btn>
            </Title>
            {result.data.map(el => <FishList key={el.id} {...el} result={result}/>)}
           {loadingOrMyFishList}
        </Div>
    )
}

const mapStateToProps = (state) => {
    // console.log(state,'88888') 
      return {
        userInfo: state.userReducer,
        myFishBoard: state.fishBoardReducer
     } 
 }

const mapDispatchToProps = {
   fishBoard
}

export default connect(mapStateToProps,mapDispatchToProps)(FishBoard)
