import React from 'react'
import {Button, CssBaseline, TextField, Typography} from '@material-ui/core';
import SendSharpIcon from '@material-ui/icons/SendSharp';

import cssClasses from './chatBoxMain.module.css'
import ChatMessages from './ChatMessages/chatMessages'

function ChatBoxMain(){
    const onSubmitHandler=(e)=>{
        e.preventDefault()
    }
    return(
        <div className={cssClasses.chatbox__main}>
            <ChatMessages></ChatMessages>
            <div className={cssClasses.sendchat}>
                <form onSubmit={onSubmitHandler} noValidate >
                    <input 
                        name="SendMsg" 
                        placeholder="Type Your Message Here"
                    ></input>
                    <button>Send <span><SendSharpIcon/></span></button>
                </form>
            </div>
        </div>
    )
}
export default ChatBoxMain;