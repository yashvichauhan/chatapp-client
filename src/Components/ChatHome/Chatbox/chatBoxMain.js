import React from 'react'
import { connect } from "react-redux"
import { Typography } from 'antd';

import cssClasses from './chatBoxMain.module.css'
import ChatMessages from './ChatMessages/chatMessages'
import SendChat from './SendChat/sendChat'
import ChatBoxUser from './ChatBoxUser/chatBoxUser'
import humans from '../../../assets/images/humans.png'

function ChatBoxMain(props){
    const { Title } = Typography;
    if(!props.cGroup){
        return(<div className={cssClasses.imageBox} >
            <img src={humans} alt="Humans"></img>
            <Title level={5} style={{color:"gray",textAlign:"center"}}>Please select a chat to begin</Title>
        </div>)}
    else{
        return(
            <div className={cssClasses.chatbox__main}>
                <ChatBoxUser cGroup={props.cGroup}/>
                <ChatMessages/>
                <SendChat/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        cGroup: state.chat.currentGroup
    }
};

export default connect(mapStateToProps)(ChatBoxMain);
