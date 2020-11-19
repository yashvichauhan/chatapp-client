import React from 'react';
import { Typography } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux"

import cssClasses from './chatgroup.module.css'
import * as reducerType from "../../../../Store/reducerType";

function ChatGroup(props){
    const { Title } = Typography;
    return(
        <>
        <div className={cssClasses.container} onClick={() => props.onCurrentGroup(props.userData)} >
            <div className={cssClasses.chatgroup__user}>
                <Avatar className={cssClasses.chatgroup__userAvatar} alt={props.userData.name} src={props.userData.avatar}></Avatar>
                <div>
                    <Title level={5} style={{marginBottom:0,color:'lightgray'}}>{props.userData.name}</Title>
                    <small style={{color:'#a7a7a7'}}>A dummy status</small>
                </div>
            </div>
            <div className={cssClasses.chatgroup__timestamp}>{'11:00 AM'}</div>
        </div>
        <hr style={{color:'#3d4761',width:'90%'}} ></hr>
        </>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
      onCurrentGroup: (groupData) =>
        dispatch({
          type: reducerType.CNG_CURRENT_GROUP,
          groupData
        }),
    };
  };
  
export default connect(null, mapDispatchToProps)(ChatGroup);
