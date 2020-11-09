import React from 'react'

import cssClasses from './message.module.css'

function Message(props){
    return(
        <>
        <div className={cssClasses.message__box} 
         style={{marginLeft:(props.outgoing)?'auto':''}}>
        <div className={cssClasses.message__content}>
            <div>
                  {props.content}
            </div>
        </div>
        </div>
        </>
    )
}

export default Message;