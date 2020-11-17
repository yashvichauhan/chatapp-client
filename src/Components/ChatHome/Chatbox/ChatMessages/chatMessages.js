import React from 'react'
import 'antd/dist/antd.css'

import cssClasses from './chatMessages.module.css' 
import Message from './../Messages/message'
import useStyles from "./useStyles"

function ChatMessages(props){
    const classes = useStyles();
    const chatMsgs=[{content:`Hi`,outgoing:true},
    {content:`Hi How are you?`,outgoing:false},
    {content:`I've recieved the news`,outgoing:true},
    {content:`Okay Good to know that You're fine have a good day! Bbye, see you.`,outgoing:false},
    {content:`Bbye, see you.`,outgoing:false},
    {content:`Okay have a good day! Bbye, see you.`,outgoing:true},
    {content:`Bbye, see you.`,outgoing:false},
    {content:`see you.`,outgoing:false}]

    const userData = JSON.parse(localStorage.getItem('currentUser')).name
    return(
        <div class={cssClasses.chatbox__messages}>
           {
            chatMsgs.map((msgContent)=>(
                <Message
                    content={msgContent.content}
                    outgoing={msgContent.outgoing}
                />
            ))
           }
        </div>
    )
}
export default ChatMessages;