import React, { useState} from 'react';
import { connect } from "react-redux";

import EditProfile from "./EditProfile/EditProfile";
import * as actions from '../../../../Store/acitons/index';

import 'antd/dist/antd.css';
import  { UserAddOutlined, MoreOutlined } from '@ant-design/icons';
import {Menu, Dropdown, Tooltip, Avatar, message} from 'antd';
import logoutHandler from '../../../Logout/logout'
import SearchUser from '../SearchUser/searchUser'
import ShowProfile from '../../ShowProfile/showProfile'
import ChatPrevGroup from './ChatPrevGroups/chatPrevGroup'

import Box from '@material-ui/core/Box';
import useStyles from "./useStyles";
import cssClasses from "./userSetting.module.css";

const UserSetting = (props) => {
    const classes = useStyles();

    const [ modal, setModal ] = useState(false);
    const [ editLoading, setEditLoading ] = useState(false);
    const [ userData, setUserData ] = useState(props.user);
    const [ profileDrawer,setProfileDrawer]=useState(false);
    
    let u_avatar = null;
    if(userData) {
      u_avatar=userData.name.charAt(0);
    }
    const closeProfile = ()=>{
      setProfileDrawer(false)
    }
    const handleCancel = () => {
      setModal(false);
    };

    const handleEditProfileSubmit = (values, file) => {
      setEditLoading(true);
      const formData = new FormData();
      if(file) {
        formData.append('avatar', file);
        console.log("File exists:")
      }else if(userData.avatar) {
        formData.append('avatar', userData.avatar);
        console.log("File doesnt exist:")
      }
      formData.append('name', values.name);
      formData.append('email', values.email);
      props.onEditProfile(props.token, formData).then(res => {
        setEditLoading(false);
        handleCancel();
        message.success(`Profile updated successfully.`);
      }).catch(err => {
        setEditLoading(false);
        message.error(`${err}`);
      });
    };

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
          <Menu.Item key="3">
            <a href="/" onClick={logoutHandler} >Logout</a>
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
          onClose={closeProfile}
          user={props.user}
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
              <Tooltip placement={"bottom"} title={"Create new Group"}>
                <UserAddOutlined className={cssClasses.userSetting__Icon}/>
              </Tooltip>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <MoreOutlined className={cssClasses.userSetting__Icon}/>
                </a>
              </Dropdown>
            </Box>
            </Box>
            <SearchUser/>
            <ChatPrevGroup/>
        </div>
      </>
    );
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
    user: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditProfile: (token, formData) => dispatch(actions.editProfile(token, formData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);