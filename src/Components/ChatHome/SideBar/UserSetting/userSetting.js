import React, { useState,useEffect} from 'react';
import { connect } from "react-redux";

import EditProfile from "./EditProfile/EditProfile";
import * as actions from '../../../../Store/acitons/index';

import 'antd/dist/antd.css';
import  { PlusOutlined ,UsergroupAddOutlined, MoreOutlined } from '@ant-design/icons';
import {Menu, Dropdown, Tooltip, Avatar, message} from 'antd';
import SearchUser from '../SearchUser/searchUser'
import ShowProfile from '../../ShowProfile/showProfile'
import ChatPrevGroup from './ChatPrevGroups/chatPrevGroup'
import CreateConnection from './CreateConnection/createConnection';
import ChatConnections from './ChatConnections/chatConnections';

import Box from '@material-ui/core/Box';
import useStyles from "./useStyles";
import cssClasses from "./userSetting.module.css";

const UserSetting = (props) => {
    const classes = useStyles();
    const [ modal, setModal ] = useState(false);
    const [ createConnection, setCreateConnection ] = useState(false);
    const [ connectionLoading, setConnectionLoading ] = useState(false);
    const [ editLoading, setEditLoading ] = useState(false);
    const [ userData, setUserData ] = useState(props.user);
    const [ profileDrawer,setProfileDrawer]=useState(false);
    
    let u_avatar = null;
    let unsubscribe;
    if(userData) {
      u_avatar=userData.name.charAt(0);
    }

    //CALLING FUNCTION
    useEffect(()=>{
      if(props.chatlist!==null && props.chatlist!==[]){
        props.chatlist.map((group)=>{
          props.getRealtimeMessages(group.gID)
          .then((res)=>{
            return res;
          })
          .catch((err)=>{
            console.log(err);
            return err;
          })
        })
      }
    },[props.chatlist]);

    useEffect(()=>{
      if(props.groups!==null && props.groups!==[]){
        props.groups.map((group)=>{
          props.ongetRealTimeUserGroup(group.reciever,group.gID)
          .then((res)=>{
            unsubscribe=res;
          })
          .catch((err)=>{
            console.log(err);
            return err;
          })
        })
      }
  },[props.groups]);  
  
    //FOR CLEANUP
    useEffect(()=>{
      return()=>{
        if(unsubscribe){
          unsubscribe();
        }
        //unsubscribe.then((f)=>f()).catch((err)=>console.log(err));
        //unsubscribeM.then((f)=>f()).catch((err)=>console.log(err));
      }
    },[])

    //UTILITY FUNCTIONS
    const handleCancel = () => {
      setModal(false);
      setProfileDrawer(false);
      setCreateConnection(false);
    };

    const handleConnectionSubmit=(values)=>{
      setConnectionLoading(true);
      const connectionData={
        email:values.email,
        imessage:values.firstmessage
      }
      props.onNewConnection(connectionData,userData)
      .then((user)=>{
        console.log("USER FOUND: "+user);
        message.success(`User added to connection!`);
        handleCancel();
      })
      .catch((err)=>{
        console.log("USER NOT FOUND "+err);
        message.error(`${err}`);
      })
      setConnectionLoading(false);
    };

    const handleShowConnection=()=>{
      props.toggleConnection();
      console.log("CONN");
    }

    const handleShowChat=()=>{
      props.toggleConnection();
      console.log("CHAT");
    }

    const handleEditProfileSubmit = (values, file) => {
      setEditLoading(true);
      let editData={
        name:values.name,
        email:values.email,
        aboutme:values.aboutme,
        userID:props.user.userID,
      }
      if(file) {
        editData['avatar']=file;
        editData['fileFlag']=true;
        console.log("INSIDE")
      }else {
        editData['avatar']=userData.avatar;
        editData['fileFlag']=false;
      }
      console.log(editData.fileFlag,editData.avatar);
      props.onEditProfile(editData,userData.email)
      .then(res => {
        setEditLoading(false);
        handleCancel();
        message.success(`Profile updated successfully.`);
      }).catch(err => {
        setEditLoading(false);
        message.error(`${err}`);
      });
    };

    const logoutHandler=()=>{
      props.onLogout(props.user.userID);
      props.hist.push('/');
    }
    //MENU 
    const menu = (
        <Menu style={{maxWidth:'200px'}}>
          <Menu.Item key="0">
            <div onClick={() => setModal(true)}>
              Edit Profile
            </div>
          </Menu.Item>
          <Menu.Item key="2">
            <div onClick={(props.showconn)?handleShowChat:handleShowConnection}>{(props.showconn)?`Chats`:`Connections`}</div>
          </Menu.Item>
          <Menu.Item key="3">
            <div onClick={logoutHandler}>Logout</div>
          </Menu.Item>
        </Menu>
      );
    return(
      <>
        <EditProfile
          visible={modal}
          handleSubmit={handleEditProfileSubmit}
          editLoading={editLoading}
          handleCancel={handleCancel}
          userData={userData}
        />
        <ShowProfile
          visible={profileDrawer}
          onClose={handleCancel}
          user={props.user}
        />
        <CreateConnection
          visible={createConnection}
          handleConnectionSubmit={handleConnectionSubmit}
          connectionLoading={connectionLoading}
          handleCancel={handleCancel}
          userData={userData}
        />
        <div className={cssClasses.container}>
            <Box
                className={classes.box}
            >
            <Box p={1} justifyContent="flex-start">
                <Tooltip placement={"bottom"} title={"Profile"}>
                  <Avatar src={props.user.avatar} onClick={() => setProfileDrawer(true)} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{u_avatar}</Avatar>
                </Tooltip>
            </Box>
            <Box p={1} justifyContent="flex-end">
              <Tooltip placement={"bottom"} title={"New Connection"}>
                <PlusOutlined  onClick={()=>setCreateConnection(true)} className={cssClasses.userSetting__Icon}/>
              </Tooltip>
              <Tooltip placement={"bottom"} title={"Create new Group"}>
                <UsergroupAddOutlined className={cssClasses.userSetting__Icon}/>
              </Tooltip>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <MoreOutlined className={cssClasses.userSetting__Icon}/>
                </a>
              </Dropdown>
            </Box>
            </Box>
            <SearchUser/>
            {(props.showconn)?<ChatConnections/>:<ChatPrevGroup/>}
        </div>
      </>
    );
};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    currentGroup:state.chat.currentGroup,
    showconn:state.chat.showconnection,
    chatlist:state.chat.chatList,
    groups:state.chat.groups
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getRealtimeMessages:(gID)=>dispatch(actions.getRealTimeConversations(gID)),
    ongetRealTimeUserGroup:(groupID,uID)=>dispatch(actions.getRealTimeUserGroup(groupID,uID)),
    onEditProfile: (editData,email) => dispatch(actions.editProfile(editData,email)),
    onNewConnection: (connectionData,user)=>dispatch(actions.createConnection(connectionData,user)),
    toggleConnection:()=>dispatch(actions.toggleConnection()),
    onLogout:(userID)=>dispatch(actions.authLogout(userID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);