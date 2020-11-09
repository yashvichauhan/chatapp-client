import React from 'react'
import {Container,CssBaseline} from '@material-ui/core'
//import Paper from '@material-ui/core/Paper';

import cssStyle from './sidebar.module.css'
import UserSetting from './UserSetting/userSetting'

function SideBar(){
    return (
        <div className={cssStyle.side__bar}>
            <UserSetting/>
            <hr style={{color: "#333b4f"}}/>
        </div>
    )
}

export default SideBar;