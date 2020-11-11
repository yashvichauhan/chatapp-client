import React from 'react'

import cssClasses from './chatBoxMain.module.css'
import ChatMessages from './ChatMessages/chatMessages'
import SendChat from './SendChat/sendChat'
import ChatBoxUser from './ChatBoxUser/chatBoxUser'

function ChatBoxMain(){
    
    return(
        <div className={cssClasses.chatbox__main}>
            <ChatBoxUser/>
            <ChatMessages/>
            <SendChat/>
        </div>
    )
}
export default ChatBoxMain;