import React,{useState} from 'react'
import { Typography } from 'antd';
import { Drawer } from "antd";
import { Menu, Dropdown } from 'antd';
import { EllipsisOutlined,MenuOutlined ,VideoCameraOutlined,PhoneOutlined} from '@ant-design/icons'
import Avatar from '@material-ui/core/Avatar';
import 'antd/dist/antd.css'

import useStyles from "./useStyles"
import cssClasses from './chatboxuser.module.css'
import sidebarClass from '../../SideBar/SideBar'
import UserSetting from '../../SideBar/UserSetting/userSetting'

function ChatBoxUser(){
    const classes = useStyles();
    const menu = (
        <Menu style={{maxWidth:'200px'}}>
          <Menu.Item key="0">
            <a href="/editprofile">Profile</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">Clear Chat</a>
          </Menu.Item>
          <Menu.Item key="3">
          <a href="#">Block</a>
          </Menu.Item>
        </Menu>
      );
    const [visible, setVisible] = useState(false);
    const { Title } = Typography;
    return(
        <div className={cssClasses.container}>
            <div className={cssClasses.chatBoxUser__user}>
                <Avatar className={cssClasses.chatBoxUser__userAvatar} alt="Kelly Brown"></Avatar>
                <div>
                    <Title level={4} style={{marginBottom:0}}>Kelly Brown</Title>
                    <small style={{color:'#787878'}}><i>5 minutes ago</i></small>
                </div>
                <Drawer
                    placement="left"
                    onClick={() => setVisible(false)}
                    onClose={() => setVisible(false)}
                    visible={visible}
                    drawerStyle={{backgroundColor:'#1a2236'}}
                >
                <div className={sidebarClass.sider__main}>
                    <UserSetting/>
                </div>
                </Drawer>
            </div>
            <div className={cssClasses.chatBoxUser__actions}>
                <div className={cssClasses.triggerIcon}>
                    <div className={cssClasses.chatBoxUser__listalign}>
                        <a><MenuOutlined className={cssClasses.chatBoxUser__listIcons} onClick={() => setVisible(true)}/></a> 
                    </div>
                </div>
                <div className={cssClasses.chatBoxUser__listalign}>
                    <a><VideoCameraOutlined style={{color:'orange'}} className={cssClasses.chatBoxUser__listIcons} /></a>
                </div>
                <div className={cssClasses.chatBoxUser__listalign}>
                    <a><PhoneOutlined style={{color:'green'}} className={cssClasses.chatBoxUser__listIcons} /></a>
                </div>
               <div className={cssClasses.chatBoxUser__listalign}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <EllipsisOutlined className={cssClasses.chatBoxUser__listIcons}/>
                        </a>
                    </Dropdown>
               </div>
            </div>
        </div>
    );
}

export default ChatBoxUser;