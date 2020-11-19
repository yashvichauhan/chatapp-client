import React from "react";

import cssClasses from './sendchat.module.css'
import SendSharpIcon from '@material-ui/icons/SendSharp';

const SendChat = (props) => {
  const onSubmitHandler=(e)=>{
    e.preventDefault()
  }
  return (
    <div className={cssClasses.sendchat}>
            <form onSubmit={onSubmitHandler} noValidate >
                <input 
                    name="SendMsg" 
                    placeholder="Type Your Message Here"
                ></input>
                <button ><span><SendSharpIcon className={cssClasses.sendchat__icon}/></span></button>
            </form>
      </div>
  );
};

export default SendChat;