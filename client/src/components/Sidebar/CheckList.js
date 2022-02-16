import React from 'react'
import { useState } from 'react';
import LureCheck from './data/LureCheck';
import BiteCheck from './data/BiteCheck';
import OneTwoCheck from './data/OneTwoCheck';

function CheckList() {
    const [index, setIndex] = useState('0');
    const onSelect = (event) => {
        setIndex(event.target.value);
    }
    return (
        <>
            <div>
                <h1>
                    체크리스트
                </h1>
                <select value={index} onChange={onSelect}>
                    <option value='0'>루어낚시</option>
                    <option value='1'>찌낚시</option>
                    <option value='2'>원투낚시</option>
                </select>
                <hr />
                {index === '0' ? <LureCheck /> : null}
                {index === '1' ? <BiteCheck/> : null}
                {index === '2' ? <OneTwoCheck /> : null}

            </div>

        </>
    )
}

export default CheckList
