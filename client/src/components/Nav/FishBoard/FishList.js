import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link} from 'react-router-dom'
import { targetFind } from '../../../redux/store/actions'
import { useNavigate } from "react-router-dom"
import { FaCrown } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import  { keyframes } from 'styled-components';

const FishCard = styled.div`
    
    text-shadow: 3px 3px #D8D7D8;
    transition: transform 0.5s ease-in-out;
    &:hover {                
        transform: scale(1.02);
    }
    
`

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.6rem;
   
    
`

const Img = styled.img`
    width: 15vw;
    height: 40vh;
    border-radius: 2%;
    background-color: #EBF1F1;
     
`
const Box = styled.div`
    margin-right:10px;
    transition: all 0.5s ease-in-out ;
    &:hover {                
        transform: scale(1.5);
        cursor: pointer;
    }
`
const Moving = keyframes`
   
    0% {
        transform: rotateY(0);
    }
    50% {
        transform:  translateY(-100px);
    }
    100%{
        transform: rotateY(0);
    }
`

const Crown = styled.div`
    top: 10vh;
    right: 20px;
    padding: ${props => (props.width ? '24px': 0 )};
    animation-duration: infinite;
    animation-timing-function: ease-in-out;
    animation-name: ${Moving};
    animation-fill-mode: forwards;
`
const Card = styled.div`
    background-color:#D8D7D8 ;
    border-radius: 8px;
    padding-bottom: 5px;
    border: gray 0.1px solid;
    box-shadow: 0 10px 10px #3c4a5645;
`
const Blank= styled.div`
    width: 10px;
    height: 15px;
`

const Text = styled.div`
    font-size: 1.3rem;
    font-weight: bolder;
    color: gray;
    opacity: 4;
`

function FishList({fish_name, src, size, createdAt, fishId, ranked, myFishBoard, userInfo, result, targetFind,render,rerender}) {
  
    axios.defaults.withCredentials = true;
      
  

    const selectFish = () => {   
        if(userInfo.isLogin === true) {  
            return myFishBoard.data.data.realResult.find(el => el.fishId === fishId) 
        }
    }     
   
//* 수정
    const updateList = (fishInfo) => {
        targetFind(fishInfo)
} 

    
//*삭제 //myFishBoard.data// 
    const deleteList = (fishInfo) => {
        /* let body = {fishId: fishId} */
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/fish/board`,
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
            return <Crown><FaCrown  color='gold'/></Crown>
        } else {
            return <Crown width/>
        }
    }
    
    return (
        <>
        {userInfo.isLogin === false ?
            
            <FishCard>
                <div>   
                    {ranking()}
                </div>
              <Card>  
                  <Blank></Blank>
                <Img src={src} />  
                <Text>
                    {fish_name}             
                </Text>    
                <Text>
                    {size}cm
                </Text> 
                <Text>
                    {createdAt}
                </Text> 
                 
                <Div>
                    <Box>
                    <FaPencilAlt onClick={goHome}   color='skyblue' margin='10px'/> 
                    </Box>
                    <Box>
                    <FaTrashAlt onClick={goHome}   color='skyblue'/>
                    </Box>
                        
                </Div>
                </Card>
            </FishCard>
            :
            <FishCard>
                <div>    
                    {ranking()}
                </div> 
                <Card>
                <Blank></Blank>
                <Img src={src} />  
                <Text>
                    {fish_name}           
                </Text>    
                <Text>
                    {size}cm
                </Text> 
                <Text>
                    {date}
                </Text> 
                <Div>
                
                    <Box>
                    <Link to='/updateFish'><FaPencilAlt onClick={() => {updateList(selectFish)}} size="2x" color='skyblue'/></Link> 
                    </Box>
                    <Box>
                    <FaTrashAlt onClick={() =>deleteList(selectFish)}  color='skyblue'/>
                    </Box>
                        
                </Div>
                </Card>
            </FishCard>
        }
        </>   
    )
       
    
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userReducer,
        myFishBoard: state.fishBoardReducer
    }
}

const mapDispatchToProps =  {    
  
    targetFind: (fish) => targetFind(fish)
       
}
export default  connect(mapStateToProps,mapDispatchToProps)(FishList) 
