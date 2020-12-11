import React,{useState} from 'react'
import { connect } from "react-redux";
import { Menu, Dropdown,Typography,Drawer,message,Modal } from 'antd';
import { EllipsisOutlined,MenuOutlined ,ExclamationCircleOutlined,UserOutlined} from '@ant-design/icons'
import Avatar from '@material-ui/core/Avatar';
import 'antd/dist/antd.css';
import moment from 'moment';

import cssClasses from './chatboxuser.module.css';
import sidebarClass from '../../SideBar/SideBar';
import UserSetting from '../../SideBar/UserSetting/userSetting';
import ShowProfile from '../../ShowProfile/showProfile';
import * as actions from '../../../../Store/acitons/index';

function ChatBoxUser(props){
    const [visible, setVisible] = useState(false);
    const [ profileDrawer,setProfileDrawer]=useState(false);
    const {conversations,currentGroup,currentGroupData,user}=props;
    const { Title } = Typography;
    const { confirm } = Modal;
    const onClearChat=async(arr)=>{
        if(arr!==[]){
            await Promise.all(arr.map((oneMsg)=>{
                props.ondeleteMessage(oneMsg.MID,user.userID)
            }))
        }
    }
    const blockUserChat=()=>{
        props.onblockUser(currentGroup.gID,user.userID)
        .then((res)=>{
            //console.log("blocked");
        })
        .catch((err)=>{
            console.log(err);
            message.error(`Couldn't block due to some error.`);
        })
    }
    const unblockUser=()=>{
        props.onUnblockUser(currentGroup.gID,user.userID)
        .then((res)=>{
            //console.log("unblocked");
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const showPromiseConfirm=()=> {
        confirm({
          title: `Are you sure you want to Block ${currentGroup.name}?`,
          icon: <ExclamationCircleOutlined />,
          width:"350pt",
          content: `${currentGroup.name} will no longer can send message to you.`,
          onOk: ()=>blockUserChat(),
          onCancel() {},
        });
    }
    const showUnblockConfirm=()=> {
        confirm({
          title: `Are you sure you want to unblock ${currentGroup.name}?`,
          icon: <ExclamationCircleOutlined />,
          width:"350pt",
          content: `${currentGroup.name} will be able to send and recieve messages.`,
          onOk: ()=>unblockUser(),
          onCancel() {},
        });
    }
    const clearChat=()=>{
        if(conversations[currentGroup.gID]!==[]){
            const arr=conversations[currentGroup.gID];
            onClearChat(arr)
            .then((res)=>{
                message.success(`Chat Cleared successfully.`);
            })
            .catch((err)=>{
                message.error(err);
                console.log(err);
            })
        }
        else{
            message.error(`Can not clear chat some problem occurred!`);
        }
    }
    const checkDisplay=()=>{
        if(currentGroupData!==null){
            if(currentGroupData.blockedBy){
              if(currentGroupData.blockedBy.includes(user.userID)){
                  return false;
              }
            }
        }
        return true;
    }
    const closeProfile = ()=>{
        setProfileDrawer(false)
    }
    const getActiveStatus=()=>{
        if(currentGroup){
            if(currentGroup.isOnline){
                return true;
            }
        }
        return false;
    }
    const getTimeStamp=()=>{
        if(currentGroup){
            if(currentGroup.lastActive){
                return true
            }
        }
        return false;
    }
    const menu = (
        <Menu style={{maxWidth:'200px'}}>
          <Menu.Item key="0">
            <div onClick={clearChat}>Clear Chat</div>
          </Menu.Item>
          <Menu.Item key="1">
          {(checkDisplay())? <div onClick={showPromiseConfirm}>Block</div>:
          <div onClick={showUnblockConfirm}>Unblock</div>}
          </Menu.Item>
        </Menu>
      );
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
                    <small style={{color:'#787878'}}><i>{(getActiveStatus())?"Online":(getTimeStamp())?moment(currentGroup.lastActive.toDate()).fromNow():"Offline"}</i></small>
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
                    <a><UserOutlined style={{color:'orange'}} className={cssClasses.chatBoxUser__listIcons} onClick={()=>setProfileDrawer(true)} /></a>
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
      user:state.user.currentUser,
      currentGroup: state.chat.currentGroup,
      conversations:state.chat.conversations,
      currentGroupData:state.chat.currentGroupData,
    };
  };
  const mapDispatchToProps=dispatch=>{
    return{
        ondeleteMessage:(MID,userID)=>dispatch(actions.deleteMessage(MID,userID)),
        onblockUser:(groupID,userID)=>dispatch(actions.blockUser(groupID,userID)),
        onUnblockUser:(groupID,userID)=>dispatch(actions.UnblockUser(groupID,userID))
    }
} 
  
export default connect(mapStateToProps,mapDispatchToProps)(ChatBoxUser);