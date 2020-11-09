import React from 'react'
import { Typography } from 'antd';
import Avatar from '@material-ui/core/Avatar'

import cssClasses from './chatMessages.module.css' 
import Logout from '../../../Logout/logout'
import Message from './../Messages/message'
import useStyles from "./useStyles"
import 'antd/dist/antd.css'

function ChatMessages(props){
    const classes = useStyles();
    const { Title } = Typography;
    const chatMsgs=[{content:`Hi`,outgoing:true},
    {content:`Hi How are you?`,outgoing:false},
    {content:`I've recieved the news`,outgoing:true},
    {content:`Okay Good to know that You're fine have a good day! Bbye, see you.`,outgoing:false}]

    const userData = JSON.parse(localStorage.getItem('currentUser')).name
    return(
        <>
        <div className={cssClasses.chatBoxMain_currentGroup}>
            <Title level={2}>Kelly Brown</Title>
            <hr style={{color:'#E0E0E0'}}></hr>
        </div>
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
        </>
    )
}
export default ChatMessages;