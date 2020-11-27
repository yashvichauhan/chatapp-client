import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import 'antd/dist/antd.css';

import cssClasses from './chatMessages.module.css'; 
import Message from './../Messages/message';
import * as actions from '../../../../Store/acitons/index';

function ChatMessages(props){
    const chatMsgs=[{content:`Hi`,outgoing:true},
    {content:`Hi How are you?`,outgoing:false},
    {content:`I've recieved the news`,outgoing:true}]

    const {conversations,user} =props; 
    let unsubscribe;

    useEffect(()=>{
        props.getRealtimeMessages(props.user,props.currentGroup)
        .then((unsubscribe)=>{
            return unsubscribe;
        })
        .catch((err)=>{
            console.log(err);
        })
    },[props.currentGroup]);
    
    //FOR CLEANUP
    useEffect(()=>{
        return()=>{
            unsubscribe.then(f=>f()).catch((err)=>console.log(err));
        }
    },[])

    return(
        <ScrollableFeed forceScroll={true}>
        <div class={cssClasses.chatbox__messages} id="chatBoxMSg">
           {/* {
            chatMsgs.map((msgContent)=>(
                <Message
                    content={msgContent.content}
                    outgoing={msgContent.outgoing}
                />
            ))
           } */}
           {(conversations.length!==0)?
            conversations.map((singleMsg)=>(
                <Message
                    content={singleMsg.msgContext}
                    outgoing={(singleMsg.author===user.userID)?true:false}
                    key={singleMsg.MID}
                />
            ))
           :null}
        </div>
        </ScrollableFeed>
    )
}

const mapStateToProps = state => {
    return {
      user: state.user.currentUser,
      currentGroup:state.chat.currentGroup,
      conversations:state.chat.conversations
    };
};
const mapDispatchToProps=dispatch=>{
    return {
      getRealtimeMessages:(currentUser,currentGroup)=>dispatch(actions.getRealTimeConversations(currentUser,currentGroup))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatMessages);