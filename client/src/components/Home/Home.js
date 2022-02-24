import React from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
//import Sidebar from '../Sidebar/Sidebar';
import styled from 'styled-components';
import media from "styled-media-query";
import LoadingPage from '../../LoadingPage'

// const Div = styled.div`
//     background-color: #ABCCFF;
//     height:100vh;
//     width:100vw;
// `

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > * {
    padding: 2rem;
    ${media.lessThan("medium")`
      padding: 2rem 1rem;
    `}
  }
  .pc {
    ${media.lessThan("medium")`
      display: none;
    `}
  }
  .mobile {
    display: none;
    ${media.lessThan("medium")`
      display: block;
    `}
  }
`;


function Home() {
    
    return (
        <HomeContainer>
            <div>
                
            </div>
        </HomeContainer>


    )
}

export default Home
