import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import FishBoard from './FishBoard/FishBoard'

function Nav() {
    return (
        <div>
            <Sidebar/>
            //로고
            <Ranking/>
            <FishBoard/>
            <Map/>
        </div>
    )
}

export default Nav
