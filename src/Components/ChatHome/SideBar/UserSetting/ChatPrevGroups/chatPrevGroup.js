import React from 'react'
import {Typography} from 'antd'

import cssClasses from './chatPrevGroup.module.css';

function ChatPrevGroup(props){
    const {Title} =Typography;
    return(
        <div className={cssClasses.chatPrevGroup}>
            <Title level={4} style={{color:"#e6e6e6"}}>Chats</Title>
        </div>
    )
}

export default ChatPrevGroup;