import React from 'react'
import SendSharpIcon from '@material-ui/icons/SendSharp';

import cssClasses from './sendchat.module.css'

function SendChat(props){
    const onSubmitHandler=(e)=>{
        e.preventDefault()
    }
    return(
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
}

export default SendChat;