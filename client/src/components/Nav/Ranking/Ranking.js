import React from 'react'
import styled from 'styled-components';
import RankingList from './RankingList';
import photo from '../../../img/월척.png'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
// import { fishBones} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Data = styled.div`
    border: 2px dotted red;
    padding: 1em;
`
const Box = styled.div`    
    padding: 0.5em;
`
const Rank = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 2px dotted blue;
    padding: 0.5em;
    
`
const List = styled.div`
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center;
    margin: 1em;    
    border: 2px dotted red;
`
const Img = styled.img`
    width: 17vw;
  
`
const MyRank = styled.div`
    border: solid 2px green;
    padding: 1rem;
    margin-bottom: 1rem;
`
const Pagenation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Page = styled.h4`
    padding:3px
`


// 닉네임을 반환해야할것같다

function Ranking({userInfo}) {
    console.log(userInfo.email)
    const fishList = ['선택하세요', '광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대','노데이터']
    const [fishNamed, setFishName] = useState('선택하세요')
    const [selectedFishData, setSelectedFishData] = useState("") 
    const [paged, setPage] = useState(1)

    

    const getRank = () => {
        
        console.log(fishNamed,'을 선택했습니다.')
        axios.get(`https://localhost:5000/ranking?fishName=${fishNamed}&&page=${paged}`)
        .then(result => {
            console.log(result, fishNamed,'서버로부터 데이터 잘 받아져왔는지')
            console.log(result.data.data.realResult ) 
            setSelectedFishData(result.data.data.realResult)
            
        })
        .catch(error => console.log(error,'에러'))
    }

    console.log(selectedFishData, "랭킹별 데이터") 

    useEffect(() => { 
        getRank()
    }, [fishNamed, paged])
   /*  useEffect(() => { 
        getRank()
        console.log(paged)
    }, [paged])
 */
 
//selectedFishData
// 데이터가 있을때(페이지네이션1일때와 아닐때 )와 없을때로 나뉠 수 있다. */

    const rankingList = () => {
        if (fishNamed === "선택하세요") {
            return <><h1>텅</h1></>
        } else if(paged === 1) {       
            return  <div>
                <Box>  
                    <Rank>
                        <List>
                        {selectedFishData[1] === undefined ? 
                        <>
                            <Img src={photo} />
                            <h3>2등</h3>
                            <h4>정보 없음</h4>
                        </>    
                        :
                        <>
                            <Img src={photo} />
                            <h3>2등</h3>
                            <h4>{selectedFishData[1].nickname}</h4>
                            <div>{selectedFishData[1].size}cm</div> 
                        </>
                        }    
                        
                        </List>
                        <List>
                        {selectedFishData[0] === undefined ? 
                        <>
                            <Img src={photo} />
                            <h2>1등</h2>
                            <h4>정보 없음</h4>
                        </>    
                        :
                        <>
                            <Img src={photo} />
                            <h2>1등</h2>
                            <h4>{selectedFishData[0].nickname}</h4>
                            <div>{selectedFishData[0].size}cm</div> 
                        </>
                        }
                        </List>

                        <List>
                        {selectedFishData[2] === undefined ? 
                        <>
                            <Img src={photo} />
                            <h3>3등</h3>
                            <h4>정보 없음</h4>
                        </>    
                        :
                        <>
                            <Img src={photo} />
                            <h3>3등</h3>
                            <h4>{selectedFishData[2].nickname}</h4>
                            <div>{selectedFishData[2].size}cm</div> 
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
                        /* {selectedFishData.map((el,idx) => {<RankingList key={idx} {...el}/>} ) } */
                    </div>
                </Box>
                </>
            }
            
        
    } 

    return (
        <>
            <Box>
                <Data>
                    <span>어종 선택: </span>
                    <select onChange={(e)=> setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                    </select>   
                           
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
        </>
    )
}

const mapStateToProps = (state) => {
    //console.log(state,'++++++++++++++++++++++++') 
     return {
      userInfo: state.userReducer, 
      
    } 
}

export default connect(mapStateToProps)(Ranking)
