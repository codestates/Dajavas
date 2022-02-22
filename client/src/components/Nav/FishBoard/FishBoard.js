import React from 'react'
import { Link } from 'react-router-dom';
import FishList from './FishList'
import styled from 'styled-components';

import { useEffect } from 'react'
import axios from 'axios';
import photo from '../../../img/월척.png'


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


function FishBoard() {

    axios.defaults.withCredentials = true;
   
    /*   useEffect(() => {
          
          axios.get(`https://localhost:443/fish/board/email=${email}&&page?page=${page}`,{
              headers :{ authorizationtoken: '토큰담기(redux)'}
          })
          .then((result) => console.log(result)) 
          .catch(err => console.log(err))
      },[])
      const {fish_name, src, size, ranked, createdAt, id(수정삭제하려면 필요)) } = result.data
       */
      


      const result = {data:[{fish_name: '도다리',ranked:57, src: photo, size: 5, createdAt:'20220220', id:3 }]}
    return (
        <Div>
            <Title>
            <h1>나의 월척~</h1>
            <Btn><Link to='/record' style={{ textDecoration: 'none', color: 'black',fontWeight:'bolder' }}>기록하기</Link></Btn>
            </Title>
            {result.data.map(el => <FishList key={el} {...el}/>)}
        </Div>
    )
}

export default FishBoard
