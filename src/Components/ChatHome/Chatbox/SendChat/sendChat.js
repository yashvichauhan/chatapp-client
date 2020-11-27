import React,{useState} from "react";
import { connect } from "react-redux";
import {message} from 'antd';

import cssClasses from './sendchat.module.css'
import SendSharpIcon from '@material-ui/icons/SendSharp';
import * as actions from '../../../../Store/acitons/index';


const SendChat = (props) => {
  const [msgValue,setMsgValue]=useState("");

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    if(msgValue!==""){
      const msgObj = {
        msgContext:msgValue,
        author:props.user.userID,
        reciever:props.currentGroup.userID,
        groupID:props.currentGroup.gID
      }
      console.log(msgObj);
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
  return (
    <div className={cssClasses.sendchat}>
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
      </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    currentGroup:state.chat.currentGroup
  };
};
const mapDispatchToProps=dispatch=>{
  return {
    onNewChat:(msgObj)=>dispatch(actions.newChatAdd(msgObj))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SendChat);