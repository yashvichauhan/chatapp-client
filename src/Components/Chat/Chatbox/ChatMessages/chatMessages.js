import React from 'react'

import cssClasses from './chatMessages.module.css' 
import Logout from '../../../Logout/logout'

function ChatMessages(props){
    const userData = JSON.parse(localStorage.getItem('currentUser')).name
    return(
        <div class={cssClasses.chatbox__messages}>
            <h1>Welcome {userData}</h1>
            <Logout/>
        </div>
    )
}
export default ChatMessages;