import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../../img/logo.png'
//import logo from '../../img/fishmarker.png'


const Navi = styled.nav`
    display:flex;
    justify-content: space-between;
    color: #92BBFF;
    padding:0 3vw;
    
      
`
const Div = styled.div`
    font-size: 1em;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0;
    
`



    return (
        <>
            <Navi>            
               <Div><Link to='/sidebar'><FontAwesomeIcon icon={faBars} style={{target:'_blank'}}/></Link></Div>
               <Div><Link to='/ranking' style={{ textDecoration: 'none', color:'#78AAFF',fontWeight:'bolder'}}>내가 짱</Link></Div>
               <Div><Link to='/'><img src={logo} alt="logo" style={{width:200, height:80,color:'black' }} /></Link></Div>
               <Div><Link to='/fishboard' style={{ textDecoration: 'none',color:'#78AAFF',fontWeight:'bolder'}}>기록</Link></Div>
               <Div><Link to='/map' style={{ textDecoration: 'none',color:'#78AAFF',fontWeight:'bolder'}}>지도</Link></Div>
            </Navi>   
        </>
    )
}

export default Nav
