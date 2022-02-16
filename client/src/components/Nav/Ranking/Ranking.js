import React from 'react'
import styled from 'styled-components';
import RankingList from './RankingList';
import photo from '../../../img/월척.png'


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

function Ranking() {
    return (
        <div>
            <Box>
                <Data>
                    <span>어종 선택 </span>
                    <select>
                        <option>도다리</option>
                        <option>광어</option>
                        <option>돔</option>
                        <option>우럭</option>
                        <option>도다리</option>
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

export default Ranking
