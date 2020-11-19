import React,{useState} from 'react'
import { connect } from "react-redux";
import { Menu, Dropdown,Typography,Drawer  } from 'antd';
import { EllipsisOutlined,MenuOutlined ,VideoCameraOutlined,PhoneOutlined} from '@ant-design/icons'
import Avatar from '@material-ui/core/Avatar';
import 'antd/dist/antd.css'

import useStyles from "./useStyles"
import cssClasses from './chatboxuser.module.css'
import sidebarClass from '../../SideBar/SideBar'
import UserSetting from '../../SideBar/UserSetting/userSetting'
import ShowProfile from '../../ShowProfile/showProfile'

function ChatBoxUser(props){
    const classes = useStyles();
    const menu = (
        <Menu style={{maxWidth:'200px'}}>
          <Menu.Item key="0">
            <a onClick={()=>setProfileDrawer(true)}>Profile</a>
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
    const [ profileDrawer,setProfileDrawer]=useState(false);

    const { Title } = Typography;
    
    const closeProfile = ()=>{
        setProfileDrawer(false)
    }
    return(
        <>
        <ShowProfile
          visible={profileDrawer}
          onClose={closeProfile}
          user={props.currentGroup}
        />
        <div className={cssClasses.container}>
            <div className={cssClasses.chatBoxUser__user}>
                <Avatar className={cssClasses.chatBoxUser__userAvatar} src={props.currentGroup.avatar}></Avatar>
                <div>
                    <Title level={4} style={{marginBottom:0}}>{props.cGroup.name}</Title>
                    <small style={{color:'#787878'}}><i>5 minutes ago</i></small>
                </div>
                <Drawer
                    placement="left"
                    onClose={() => setVisible(false)}
                    visible={visible}
                    //className={drawerCss.myDrawer}
                    drawerStyle={{backgroundColor:'#1a2236',padding:0}}
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
        </>
    );
}
const mapStateToProps = state => {
    return {
      token: state.user.token,
      currentGroup: state.chat.currentGroup,
    };
  };
  
  
export default connect(mapStateToProps)(ChatBoxUser);