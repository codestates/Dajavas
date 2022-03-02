import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Div = styled.div`
    border: solid 1px wheat;
`

function Like({location_name, long, lat}) {
    return (
        <>
        {long !== undefined ?
        <Div>
            <div>{location_name}</div>
            <div>{lat}</div>
            <div>{long}</div>
            <FontAwesomeIcon  icon={faPencil}  color='skyblue' margin='10px'/> 
            <FontAwesomeIcon  icon={faTrashCan}  color='skyblue'/>
        </Div>
        :
        <Div>
        <div>정보없음</div>
        <div>-</div>
        <div>-</div>
        </Div>
        }
        </>
    )
}

export default Like
