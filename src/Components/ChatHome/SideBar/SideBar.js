import React,{useEffect,useState} from "react";
import { Layout ,message} from "antd";
import { connect } from "react-redux";

import cssClasses from "./sidebar.module.css";
import UserSetting from './UserSetting/userSetting';
import * as actions from '../../../Store/acitons/index';

const SideBar = (props) => {

  let unsubscribeChat;
  let unsubscribeGroup;
  useEffect(()=>{
    unsubscribeChat=props.onGetRealTimeChatList(props.user)
    .then((res)=>{
      return res;
    })
    .catch((err)=>{
      console.log(err);
      message(`Couldn't Load Chats some error ocuured!`);
    })
    //FETCH GROUPS LIST
    unsubscribeGroup=props.onRealTimeGroupList(props.user.userID)
    .then((res)=>{
      return res;
    })
    .catch((err)=>{
      console.log(err);
      message(`Couldn't Load groups some error ocuured!`);
    })
  },[]);
  //FOR CLEANUP
  useEffect(()=>{
    return()=>{
        unsubscribeGroup.then((fnc)=>fnc()).catch((err)=>console.log(err));
        unsubscribeChat.then((fnc)=>fnc()).catch((err)=>console.log(err));
    }
  },[])

  return (
    <Layout.Sider
      className={cssClasses.sider__main}
      breakpoint={"lg"}
      collapsedWidth="0"
      trigger={null}
      width={350}
    >
      <UserSetting hist={props.hist}/>
    </Layout.Sider>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    showconn:state.chat.showconnection
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetRealTimeChatList:(currentUser)=>dispatch(actions.getRealTimeChatList(currentUser)),
    onRealTimeGroupList :(currentUID)=>dispatch(actions.getRealTimeGroupList(currentUID))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SideBar);