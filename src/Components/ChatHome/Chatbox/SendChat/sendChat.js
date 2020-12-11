import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import {message,Typography} from 'antd';

import cssClasses from './sendchat.module.css'
import SendSharpIcon from '@material-ui/icons/SendSharp';
import * as actions from '../../../../Store/acitons/index';


const SendChat = (props) => {
  const [msgValue,setMsgValue]=useState("");
  const {title} =Typography;
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    if(msgValue!==""){
      const msgObj = {
        msgContext:msgValue,
        author:props.user.userID,
        reciever:props.currentGroup.userID,
        groupID:props.currentGroup.gID
      }
      props.onNewChat(msgObj)
      .then((res)=>{
        console.log("Message sent.");
      })
      .catch((err)=>{
        console.log(err);
        message.error("Some error occured!");
      })
      setMsgValue("");
      document.getElementById('sendMsg').focus();
    }
  }
  const checkDisplay=()=>{
    if(props.currentGroupData!==null){
      if(props.currentGroupData.blockedBy){
        if(props.currentGroupData.blockedBy.length===0){
          return true;
        }
        return false;    
      }
    }
    return true;
  }
  const blockMessage=()=>{
    if(props.currentGroupData.blockedBy){
      if(props.currentGroupData.blockedBy.includes(props.user.userID)){
        return true;
      }
      else{
        return false;
      }
    }
    return true;
  }
  return (
    <>
      {(checkDisplay())?
      ( <div className={cssClasses.sendchat}>
        <form onSubmit={onSubmitHandler} noValidate name="sendmsg">
                <input 
                    name="SendMsg" 
                    id="sendMsg"
                    placeholder="Type Your Message Here"
                    onChange={(e)=>{setMsgValue(e.target.value)}}
                    value={msgValue}
                    autoFocus
                ></input>
                <button ><span><SendSharpIcon className={cssClasses.sendchat__icon}/></span></button>
        </form>
      </div>):(blockMessage()?(<div className={cssClasses.sendchat__blocked}>You Blocked {props.currentGroup.name} tap settings to unblock</div>):(<div className={cssClasses.sendchat__blocked}>You No longer can send or recieve messages from {props.currentGroup.name}</div>))}
      </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    currentGroup:state.chat.currentGroup,
    currentGroupData:state.chat.currentGroupData
  };
};
const mapDispatchToProps=dispatch=>{
  return {
    onNewChat:(msgObj)=>dispatch(actions.newChatAdd(msgObj))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SendChat);