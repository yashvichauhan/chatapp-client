import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Menu, Dropdown, message,Popconfirm} from 'antd';
import { connect } from "react-redux";

import 'antd/dist/antd.css'
import cssClasses from './message.module.css'
import ForwardMessage from './ForwardMessage/forwardMessage';
import * as actions from '../../../../Store/acitons/index';

function Message(props){
    const [forwardVisible, setforwardVisible] = useState(false);
    const [forwardLoading, setforwardLoading] = useState(false);
    const getTimeStamp=(timestamp)=>{
        const tmp=timestamp.toDate().toString().split(' ');
        const timefull=tmp[4].split(':');
        if(timefull[0]>12){
            return ((timefull[0]-12)+":"+timefull[1]+" PM");
        }else{
            return (timefull[0]+":"+timefull[1]+" AM");
        }
    };
    const handleCancel = () => {
        setforwardVisible(false);
    };
    const handleForwardSubmit=(values)=>{
        setforwardLoading(true);
        values['checkboxes'].map((gID)=>{
            let st=[];
            st=new Set([...props.currentM.stakeholders,props.user.userID]);
            let msgObj={
                author:props.user.userID,
                groupID:gID,
                msgContext:props.currentM.msgContext,
                rArr:props.userList[gID].userID,
                flg:(props.currentM.author===props.user.userID)?-1:1,
                sArr:[...st],
                originID:props.currentM.MID
            }
            props.onnewforwardMessageAdd(msgObj)
            .then((res)=>{
                setforwardLoading(false);
                handleCancel();
            })
            .catch((err)=>{
                setforwardLoading(false)
                message.error(`${err}`);
                console.log(err);
            })
        })
    }
    const setForwardProp = (e)=>{
        setforwardVisible(true);
    }
    const onDeleteMsg=()=>{
        props.ondeleteMessage(props.currentM.MID,props.user.userID)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    //MENU 
    const menu = (
        <Menu style={{maxWidth:'150px'}}>
          <Menu.Item key="0">
            <div onClick={setForwardProp}>
              Forward
            </div>
          </Menu.Item>
          <Menu.Item key="1">
            <Popconfirm
                placement="topRight"
                title={"Are you sure you want to delete this message?"}
                onConfirm={onDeleteMsg}
                okText="Yes"
                cancelText="No"
            >
            <div>Delete</div> 
            </Popconfirm>
          </Menu.Item>
        </Menu>
      );
    return(
        <>
        <ForwardMessage
          visible={forwardVisible}
          handleSubmit={handleForwardSubmit}
          ForwardLoading={forwardLoading}
          handleCancel={handleCancel}
          userList={props.userList}
          formName={props.MID}
        />
        <div className={cssClasses.message__box} 
         style={{marginLeft:(props.outgoing)?'auto':''}}>
            <div className={cssClasses.message_contentbox}>
                <Avatar src={props.currentGroup.avatar} style={{height:'1.5em',width:'1.5em',marginRight:'10px',display:(props.outgoing)?'none':''}}></Avatar>
                {(props.outgoing)?(
                    <>
                    <Dropdown placement="topLeft" overlay={menu} trigger={['click']} className={cssClasses.hide_msg}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <MoreHorizIcon className={cssClasses.message_outline} onClick={()=>{props.onchangeCurrentMsg(props.messageData)}}/>
                        </a>
                    </Dropdown>
                    <div className={cssClasses.message__content}>
                        <small className={cssClasses.message__forward}>{(props.messageData.forwardCount==1)?"forwarded":null}</small>
                        <div>
                            {props.content}
                        </div>
                        <div className={cssClasses.message_time}>
                            <span>{getTimeStamp(props.timeStamp)}</span>
                        </div>
                    </div>
                    </>
                ): (
                    <>
                    <div className={cssClasses.message__content}>
                        <small className={cssClasses.message__forward}>{(props.messageData.forwardCount==1)?"forwarded":null}</small>
                        <div>
                            {props.content}
                        </div>
                        <div className={cssClasses.message_time}>
                            <span>{getTimeStamp(props.timeStamp)}</span>
                        </div>
                    </div>
                    <Dropdown placement="topRight" overlay={menu} trigger={['click']} className={cssClasses.hide_msg}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <MoreHorizIcon className={cssClasses.message_outline} onClick={()=>{props.onchangeCurrentMsg(props.messageData)}}/>
                        </a>
                    </Dropdown>
                    </>
                )}
            </div>
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
      token: state.user.token,
      currentGroup:state.chat.currentGroup,
      userList:state.chat.userGroupList,
      user:state.user.currentUser,
      currentM:state.chat.currentMsg
    };
  };
const mapDispatchToProps=dispatch=>{
    return{
        onchangeCurrentMsg:(cMsg)=>dispatch(actions.changeCurrentMsg(cMsg)),
        onnewforwardMessageAdd:(msgObj)=>dispatch(actions.newforwardMessageAdd(msgObj)),
        ondeleteMessage:(MID,userID)=>dispatch(actions.deleteMessage(MID,userID))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Message);