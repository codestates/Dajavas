import React from 'react'
import styled from 'styled-components';
import RankingList from './RankingList';
import photo from '../../../img/월척.jpg'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import Wave from "react-wavify";
import Footer from '../../Footer/Footer';
import { FaCrown } from "react-icons/fa";
import { FaFish } from "react-icons/fa";




const Background = styled.div`
   
    background-color: #8bbac2;
    height: 155vh;
    width:  100%;
    box-shadow: 0 25px 25px #3c4a5645;
`
const Data = styled.div`
    padding: 1em;
`
const Box = styled.div`    
    

`
const Rank = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    padding: 0;
    
    
`
const List = styled.div`
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center;
    margin: 0 0.3rem;   
    border: 2px solid gray;
    border-radius: 2%;
    background-color: #EEE9BF;
    box-shadow: 0 10px 25px #3c4a5645;
    transition: all 0.5s ease-in-out ;
    &:hover {                
        transform: scale(1.1);
        cursor: pointer;
    }
    font-size: large;
    padding-bottom: 10px;

`
const Img = styled.img`
    width: 17vw;
    background-color:#EBF1F1 ;
    border-radius: 2%;
    height: 25vh;
    padding:10px;
  
`
// const MyRank = styled.div`
//     border: solid 2px green;
//     padding: 1rem;
//     margin-bottom: 1rem;
// `
const Pagenation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`

const Page = styled.h2`
    color: black;
    opacity: 0.7;
    padding: 6px;
    transition: all 0.5s ease-in-out ;
    &:hover {                
        transform: scale(1.5);
        cursor: pointer;
        color: coral;
    }
`
const Blank = styled.div`
    width: 10px;
    height: 15px;
`
const Title = styled.h1`
margin: 10px;
padding: 10px;
color: #1B5A5D;
`


const Select = styled.select`
    border:0px solid black;
    outline: none;
    padding:10px;
    background-color:#62B994;
    border-radius: 8%;
    box-shadow: 0 10px 25px #3c4a5645;
    font-weight: bolder;
    font-size: 1.3rem;
    
`
const Text = styled.div`
    font-size: 1.3rem;
    font-weight: bolder;
    color: gray;
    opacity: 4;
    margin: 0.4rem;
    
`
// 닉네임을 반환해야할것같다

function Ranking({userInfo, sidebar}) {
    const fishList = ['선택하세요', '광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대','노데이터']
    const [fishNamed, setFishName] = useState('선택하세요')
    const [selectedFishData, setSelectedFishData] = useState("") 
    const [paged, setPage] = useState(1)

  

 /*    const getRank = () => {
        
        axios.get(`https://localhost:5000/ranking?fishName=${fishNamed}&&page=${paged}`)
        .then(result => {
            // console.log(result.data.data.realResult ) 
            setSelectedFishData(result.data.data.realResult)
            
        })
        .catch(error => console.log(error,'에러'))
    } */


    useEffect(() => { 
        const getRank = () => {
        
            axios.get(`${process.env.REACT_APP_BASE_URL}/ranking?fishName=${fishNamed}&&page=${paged}`)
            .then(result => {
                // console.log(result.data.data.realResult ) 
                setSelectedFishData(result.data.data.realResult)
                
            })
            .catch(error => console.log(error,'에러'))
        }
        getRank()
    }, [fishNamed, paged])
  
 
//selectedFishData
// 데이터가 있을때(페이지네이션1일때와 아닐때 )와 없을때로 나뉠 수 있다. */

    const rankingList = () => {
        if (fishNamed === "선택하세요") {
            return <>
                    <Blank/>
                    <Blank/>
                    <Blank/>
                    <Title><FaFish/> 어류를 선택해주세요 <FaFish/></Title> 
                    <Blank/>
                    <Blank/>
                    <Wave
                        fill = '#1277b0'
                        paused={false}
                        options={{
                            height: 10,
                            amplitude: 18,
                            speed: 0.30,
                            points: 8
                        }}

                    /> 
                    </>
        } else if(paged === 1) {       
            return  <div>
                <Box>  
                    <Rank>
                        <List second>
                        {selectedFishData[1] === undefined ? 
                        <>  
                            <Blank></Blank>
                            <Img src={photo} />
                            <Text>2등</Text>
                            <Text>정보 없음</Text>
                        </>    
                        :
                        <>
                            <Blank></Blank>
                            <Img src={selectedFishData[1].src} />
                            <Text>2등</Text>
                            <Text>{selectedFishData[1].nickname}</Text>
                            <Text>{selectedFishData[1].size}cm</Text> 
                        </>
                        }    
                        
                        </List>
                        <List >
                        {selectedFishData[0] === undefined ? 
                        <>
                            <Blank></Blank>
                            <Img src={photo} />
                            <Text>1등</Text>
                            <Text>정보 없음</Text>
                        </>    
                        :
                        <>
                            <Blank></Blank>
                            <Img src={selectedFishData[0].src} />
                            <Text>1등</Text>
                            <Text>{selectedFishData[0].nickname}</Text>
                            <Text>{selectedFishData[0].size}cm</Text> 
                        </>
                        }
                        </List>

                        <List third>
                        {selectedFishData[2] === undefined ? 
                        <>
                            <Blank></Blank>
                            <Img src={photo} />
                            <Text>3등</Text>
                            <Text>정보 없음</Text>
                        </>    
                        :
                        <>
                            <Blank></Blank>
                            <Img src={selectedFishData[1].src} />
                            <Text>3등</Text>
                            <Text>{selectedFishData[2].nickname}</Text>
                            <Text>{selectedFishData[2].size}cm</Text> 
                        </>
                        }
                        </List>
                    </Rank>
                </Box>
                <Box>        
                    <div>                  
                        <RankingList {...selectedFishData[3]}/>
                        <RankingList {...selectedFishData[4]}/>
                    </div>
                </Box>
            </div>
            }else {
                return <>
                <Box>        
                    <div>
                        <RankingList {...selectedFishData[0]}/>
                        <RankingList {...selectedFishData[1]}/>
                        <RankingList {...selectedFishData[2]}/>
                        <RankingList {...selectedFishData[3]}/>
                        <RankingList {...selectedFishData[4]}/>
                    </div>
                    
                </Box>
                </>
            }
            
        
    } 

    return (
        <>
        
        <Background>
            <Box>
                <Data>
                    <Title><FaCrown color='gold' /> Ranking <FaCrown color='gold' /></Title>
                    <Select onChange={(e)=> setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                    </Select>   
                           
                </Data>
            </Box>
            {rankingList()}                 
       
            <Pagenation>
                
                <Page onClick ={() => setPage(1)}>1</Page>
                <Page onClick={() => setPage(2)}>2</Page>
                <Page onClick={() => setPage(3)}>3</Page>
                <Page onClick={() => setPage(4)}>4</Page>
                <Page onClick={() => setPage(5)}>5</Page>
            
            </Pagenation>
            
        </Background>
        <Footer />
        </> 
    )
}

const mapStateToProps = (state) => {
     return {
      userInfo: state.userReducer,
      sidebar: state.sideBarReducer.isSideBar   
      
    } 
}

export default connect(mapStateToProps)(Ranking)
