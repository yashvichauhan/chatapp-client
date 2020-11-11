import React from 'react'
import Avatar from '@material-ui/core/Avatar';

import cssClasses from './message.module.css'
import 'antd/dist/antd.css'

function Message(props){
    return(
        <>
        <div className={cssClasses.message__box} 
         style={{marginLeft:(props.outgoing)?'auto':''}}>
            <div className={cssClasses.message_contentbox}>
                <Avatar alt="Kelly Brown" style={{height:'1.5em',width:'1.5em',marginRight:'10px',display:(props.outgoing)?'none':''}}></Avatar>
                <div className={cssClasses.message__content}>
                    <div>
                        {props.content}
                    </div>
                </div>
                <div className={cssClasses.message_time}>
                    {'1:30 PM'}
                </div>
            </div>
        </div>
        </>
    )
}

export default Message;