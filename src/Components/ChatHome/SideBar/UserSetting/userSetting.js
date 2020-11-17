import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import  {MoreOutlined} from '@ant-design/icons';
import  {UserAddOutlined} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

import Box from '@material-ui/core/Box';
import 'antd/dist/antd.css'

import useStyles from "./useStyles"
import cssClasses from "./userSetting.module.css"
import logoutHandler from '../../../Logout/logout'
import SearchUser from '../SearchUser/searchUser'

function UserSetting(){
    const classes = useStyles();
    const userData=JSON.parse(localStorage.getItem('currentUser'))
    const u_avatar=userData.name.charAt(0)
    const menu = (
        <Menu style={{maxWidth:'200px'}}>
          <Menu.Item key="0">
            <a href="/#">Edit Profile</a>
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
        <div className={cssClasses.container}>
            <Box
                className={classes.box}
            >
            <Box p={1} justifyContent="flex-start" >
                <Avatar className={`${classes.purple} ${classes.large}`}>{u_avatar}</Avatar>
            </Box>
            <Box p={1} justifyContent="flex-end">
                <UserAddOutlined className={cssClasses.userSetting__Icon}/>
                <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <MoreOutlined className={cssClasses.userSetting__Icon}/>
                </a>
                </Dropdown>
            </Box>
            </Box>
            <SearchUser/>
        </div>
    )
}
export default UserSetting;