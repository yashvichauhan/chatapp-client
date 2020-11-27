import React, { useState} from 'react';
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
    if(userData) {
      u_avatar=userData.name.charAt(0);
    }
    const handleCancel = () => {
      setModal(false);
      setProfileDrawer(false);
      setCreateConnection(false);
    };
    const handleConnectionSubmit=(values)=>{
      setConnectionLoading(true);
      const connectionData={
        email:values.email,
        firstmessage:values.firstmessage
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
      props.showConnection(userData)
      .then((res)=>{
        //do nothing 
      })
      .catch((err)=>{
        console.log(err);
      })
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
      props.onLogout();
    }
    //MENU 
    const menu = (
        <Menu style={{maxWidth:'200px'}}>
          <Menu.Item key="0">
            <div onClick={() => setModal(true)}>
              Edit Profile
            </div>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="/#">Settings</a>
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
    showconn:state.chat.showconnection
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEditProfile: (editData,email) => dispatch(actions.editProfile(editData,email)),
    onNewConnection: (connectionData,user)=>dispatch(actions.createConnection(connectionData,user)),
    showConnection: (user)=>dispatch(actions.showConnection(user)),
    toggleConnection:()=>dispatch(actions.toggleConnection()),
    onLogout:()=>dispatch(actions.authLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);