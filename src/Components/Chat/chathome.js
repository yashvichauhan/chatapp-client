import React from 'react'

import imga from "../../assets/images/avatar1Rect.jpg"
import SideBar from "./Sidebar/SideBar"
import cssClasses from "./chathome.module.css"
import ChatBoxMain from './Chatbox/chatBoxMain'

function Chathome(props) {
    return (
        <div className={cssClasses.chathome}>
            <SideBar/>
            <ChatBoxMain/>
        </div>
    )
}
export default Chathome;

