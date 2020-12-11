import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { Button ,message} from 'antd';
import 'antd/dist/antd.css';

import cssClasses from './chatMessages.module.css'; 
import Message from './../Messages/message';
import * as actions from '../../../../Store/acitons/index';

function ChatMessages(props){
    const {conversations,user,currentGroup} =props;
    let prevDate=null;
    let unreadCount=false;
   
    const MarKAsRead=()=>{
        if(conversations[currentGroup.gID]){
            props.onCheckUnreadMsg(conversations[currentGroup.gID],user.userID)
            .then(()=>{
                console.log("Check successful");
            })
            .catch((err)=>{
                message.error(`Some error occurred.`);
                console.log(err);
            })
        }else{
            return;
        }
    }
    const getDateString=(msgCreatedAt)=>{
        return msgCreatedAt.toDate().toLocaleDateString();
    }
    const checkDateGroup=(msgDate)=>{
        if(prevDate!==msgDate){
            prevDate=msgDate;
            return true;
        }else{
            return false
        }
    }
    const formatString=(prevdate)=>{
        const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        ];
        const data=new Date(prevdate);
        return monthNames[data.getMonth()] + " "+ data.getDate()+","+data.getFullYear();
    }
    const checkDisplay=(singleMsg)=>{
        if(singleMsg.deletedBy){
            return !(singleMsg.deletedBy.includes(user.userID))
        }
        return true;
    }
    const checkUnread=(singleMsg)=>{
        if(!singleMsg.readFlag && singleMsg.author!==user.userID && !unreadCount){
            unreadCount=true;
            return true;
        }
        else{
            return false;
        }
    }
    return(
        <ScrollableFeed forceScroll={true}>
        <div className={cssClasses.chatbox__messages} id="chatBoxMSg">
           {(conversations[currentGroup.gID])?
            conversations[currentGroup.gID].map((singleMsg)=>
                (checkDisplay(singleMsg))?(
                <React.Fragment key={singleMsg.MID}>
                <div style={{textAlign:"center",color:"#1a2236" ,fontSize:'8pt' ,marginBottom:"1rem" ,display:(checkDateGroup(getDateString(singleMsg.createdAt)))?"border-box":"none"}}>{formatString(prevDate)}</div>
                {/* <div style={{display:checkUnread(singleMsg)?"border-box":"none"}}>
                    <div className={cssClasses.separator} >
                        Unread Messages
                    </div>
                    <Button 
                        type="default" 
                        size="small" 
                        style={{float:'right'}}
                        onClick={MarKAsRead}
                    >Mark as Read
                    </Button>
                </div> */}
                <Message
                    content={singleMsg.msgContext}
                    outgoing={(singleMsg.author===user.userID)?true:false}
                    key={singleMsg.MID}
                    timeStamp={singleMsg.createdAt}
                    MID={singleMsg.MID}
                    stakeHolders={singleMsg.stakeholders}
                    messageData={singleMsg}
                />
                </React.Fragment>
                ):null
            )
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
        onCheckUnreadMsg:(conversationsArr,userID)=>dispatch(actions.CheckUnreadMsg(conversationsArr,userID))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(ChatMessages);