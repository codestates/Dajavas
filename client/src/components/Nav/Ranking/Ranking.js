import React from 'react'
import styled from 'styled-components';
import RankingList from './RankingList';
import photo from '../../../img/월척.png'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';


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
    const fishList = ['선택하세요', '광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState('선택하세요')
    const [selectedFishData, setSelectedFishData] = useState("") 
    const [page, setPage] = useState(1)
//닉네임이 안왔다., 그리고 헤더스에 뭐보내줄건 없는지 확인
    const getRank = () => {
        
        console.log(fishName,'을 선택했습니다.')
        axios.get(`https://localhost:5000/ranking?fishName=${fishName}&&page=${page}`)
        .then(result => {
            console.log(result,'서버로부터 데이터 잘 받아져왔는지')
            const data = result.data.data.realResult  
            setSelectedFishData(data)
        })
        .catch(error => console.log(error))
    }
    console.log(selectedFishData, "랭킹별 데이터") 
   
    useEffect(() => {
       getRank()
    }, [fishName, page])




    return (
        <>
            <Box>
                <Data>
                    <span>어종 선택: </span>
                    <select onChange={(e)=>setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                    </select>            
                </Data>
            </Box>
/* //여기 잘안된다. selectedFishData === '선택하세요' */
    {selectedFishData !== '선택하세요' ? 
            <>       
        {page === 1 ?    
            <div>
                <Box>  
                    <Rank>
                        <List>
                            <Img src={photo} />
                            <div>2등</div>
                            <div>닉네임</div>
                            
                           
                        </List>
                        <List>
                            <Img src={photo} />
                            <div>1등</div>
                            <div>닉네임</div>
                            
                            
                        </List>

                        <List>
                            <Img src={photo} /> 
                            <div>3등</div>
                            <div>닉네임</div>
                            
                        </List>
                    </Rank>
                </Box>
                <Box>        
                    <div>                  
                        <RankingList/>
                        <RankingList/>
                    </div>
                
                </Box>
            </div>
        :
                <Box>        
                    <div>
                     
                        <RankingList/>
                        <RankingList/>
                        <RankingList/>
                        <RankingList/>
                        <RankingList/> 
                    </div>
                </Box>
        }
            </>
            :(<>어종을 선택해주세요</>)
        }  
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
    console.log(state,'++++++++++++++++++++++++') 
     return {
      userInfo: state.userReducer    
    } 
}

export default connect(mapStateToProps)(Ranking)
