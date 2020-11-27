import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";

import 'antd/dist/antd.css'
import cssClasses from './message.module.css'

function Message(props){
    return(
        <>
        <div className={cssClasses.message__box} 
         style={{marginLeft:(props.outgoing)?'auto':''}}>
            <div className={cssClasses.message_contentbox}>
                <Avatar src={props.currentGroup.avatar} style={{height:'1.5em',width:'1.5em',marginRight:'10px',display:(props.outgoing)?'none':''}}></Avatar>
                <div className={cssClasses.message__content}>
                    <div>
                        {props.content}
                    </div>
                    <div className={cssClasses.message_time}>
                        <span>{'1:30 PM'}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
      token: state.user.token,
      currentGroup:state.chat.currentGroup
    };
  };
  
export default connect(mapStateToProps)(Message);