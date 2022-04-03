import React from 'react'
import { useState } from 'react';
import LureCheck from './data/LureCheck';
import BiteCheck from './data/BiteCheck';
import OneTwoCheck from './data/OneTwoCheck';
import styled from 'styled-components'
import Footer from '../Footer/Footer'

const Container = styled.div`
    border: 2px #CED4D9 solid;
    width: 50vw;
    margin-bottom: 3rem;
    margin-left: 20rem;
    margin-top: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px #3c4a5645;
`
const Title = styled.div`
    color: black;
    opacity: 0.7;
    margin: 15px;
    font-weight: bold;
    font-size:2rem;
    
`
const Select = styled.select`
    border:none;
    padding:0.7rem;
    background-color:rgb(222, 247, 243);
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    opacity: 0.6;

`


function CheckList() {
    const [index, setIndex] = useState('0');
    const onSelect = (event) => {
        setIndex(event.target.value);
    }
    return (
        <> 
            
           
            <Container>
                <Title>
                    체크리스트
                </Title>
                <Select value={index} onChange={onSelect}>
                    <option value='0'>루어낚시</option>
                    <option value='1'>찌낚시</option>
                    <option value='2'>원투낚시</option>
                </Select>
                <hr />
                {index === '0' ? <LureCheck /> : null}
                {index === '1' ? <BiteCheck/> : null}
                {index === '2' ? <OneTwoCheck /> : null}

            </Container>

        <Footer />
        
        </>
    )
}

export default CheckList
