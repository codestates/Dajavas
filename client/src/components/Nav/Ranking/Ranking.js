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
// email이 필요한가?? 그리고 닉네임을 반환해야할것같다

function Ranking({userInfo}) {
    console.log(userInfo.email)
    const fishList = ['광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState("")
    const [selectedFishData, setSelectedFishData] = useState("") 

//닉네임이 안왔다., 그리고 헤더스에 뭐보내줄건 없는지 확인
    const getRank = () => {
        console.log(fishName,'을 선택했습니다.')
        axios.get(`https://localhost:443/ranking/fishName?fishName=${fishName}&&email=${userInfo.email}`)
        .then(result => {
            console.log(result.data,'서버로부터 데이터 잘 받아져왔는지')
            setSelectedFishData(result.data)
            console.log(selectedFishData, "랭킹별 데이터")
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
       getRank()
    }, [fishName])




    return (
        <div>
            <Box>
                <Data>
                    <span>어종 선택: </span>
                    <select onChange={(e)=>setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                    </select>
                    
                </Data>
            </Box>    
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
                    <RankingList/>
                    <RankingList/>

                </div>
            </Box>
            <Box>        
                <MyRank>
                    내순위
                </MyRank>
            </Box>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state,'++++++++++++++++++++++++') 
     return {
      userInfo: state.userReducer    
    } 
}

export default connect(mapStateToProps)(Ranking)
