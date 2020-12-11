import React,{useEffect} from 'react';
import { Typography } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux"

import cssClasses from './chatgroup.module.css'
import * as actions from '../../../../Store/acitons/index';
import { Hidden } from '@material-ui/core';

function ChatGroup(props){
    const { Title } = Typography;
    const {user, currentGroup,showconn,conversations}=props;
    let unsubscribe;
    const getLastMessage=(gid)=>{
      if(conversations[gid]!==undefined && conversations[gid]!==[]){
        const arr=conversations[gid];
        return arr[arr.length-1].msgContext;
      }
    }
    const getLastChatTime =(gid)=>{
      if(conversations[gid]!==undefined && conversations[gid]!==[]){
        const arr=conversations[gid];
        return arr[arr.length-1].createdAt.toDate().toLocaleString().split(',')[0];
      }
    }
    const getDisplay=(gid)=>{
      if(showconn){
        return false;
      }else{
        if(conversations[gid]!==undefined && conversations[gid]!==[]){
          const res=conversations[gid].every((msg)=>{
            if(msg.deletedBy){
              if(msg.deletedBy.includes(user.userID)){
                return true;
              }
            }
            return false; 
          })
          return res;
        }
      }
    }
    const changeCurrentGrp=()=>{
      unsubscribe=props.onCurrentGroup(props.userData)
      .then((sb)=>{
        unsubscribe=sb;
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    const getSelected=()=>{
      if(props.currentGroup){
        return (props.userData.userID===props.currentGroup.userID);
      }
      return false;
    }
    const getUnreadMsg=()=>{
      if(getLastMessage(props.userData.gID).author!==user.userID){
        if(!getLastMessage(props.userData.gID).readFlag){
          return true;
        }
      }
      return false;
    }
    useEffect(()=>{
      return()=>{
        if(unsubscribe!==undefined){
          unsubscribe.map((fnc)=>{
            fnc();
          });
        }
      }
    },[])
    return(
        <>
        {!(getDisplay(props.userData.gID))?<div style={{backgroundColor:(getSelected())?'#293145':'#1a2236'}}>
        <div className={cssClasses.container} onClick={changeCurrentGrp}>
            <div className={cssClasses.chatgroup__user}>
                <Avatar className={cssClasses.chatgroup__userAvatar} alt={props.userData.name} src={props.userData.avatar}></Avatar>
                <div style={{overflow:Hidden}}>
                    <Title level={5} style={{marginBottom:0,color:'lightgray'}}>{props.userData.name}</Title>
                    <div style={{overflow:Hidden}}>
                      <small>{(showconn)?<div style={{color:'#a7a7a7'}}>{props.userData.aboutme}</div>:
                      // <div style={{color:(getUnreadMsg())?"white":"#a7a7a7"}}>
                      //   {getLastMessage(props.userData.gID).msgContext}
                      // </div>}
                      <div>{getLastMessage(props.userData.gID)}</div>}
                      </small>
                    </div>
                </div>
            </div>
            <div className={cssClasses.chatgroup__timestamp}>{(!showconn)?getLastChatTime(props.userData.gID):null}</div>
        </div>
        <hr style={{color:'#3d4761',width:'90%',margin:0,display:(!showconn)?'block':'none'}}></hr>
        </div>:null}
        </>
    )
}

const mapStateToProps= state =>{
  return {
    user:state.user.currentUser,
    currentGroup:state.chat.currentGroup,
    showconn:state.chat.showconnection,
    conversations: state.chat.conversations
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onCurrentGroup: (groupData) =>dispatch(actions.changeCurrentGroup(groupData))
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ChatGroup);
