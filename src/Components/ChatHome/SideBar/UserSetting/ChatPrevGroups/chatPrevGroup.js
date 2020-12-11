import React,{useState,useEffect} from 'react'
import {Typography} from 'antd'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';

import cssClasses from './chatPrevGroup.module.css';
import ChatGroups from '../../ChatGroups/chatGroup';
import * as actions from '../../../../../Store/acitons/chatActions';

function ChatPrevGroup(props){
    const groupList =(props.chatlist)? props.chatlist.map((group)=>{
        return group.gID;
    }):null;
    let unsubcribeUser;
    useEffect(()=>{
        unsubcribeUser=props.onGetRealTimeUserList(groupList,props.user.userID)
        .then((sb)=>{
            unsubcribeUser=sb;
        })
        .catch((err)=>{
            return err;
        })
    },[props.chatlist])

    //CLEANUP
    useEffect(()=>{
        return ()=>{
            console.log(unsubcribeUser);
            // if(unsubcribeUser!==undefined){
            //     unsubcribeUser();
            // }
        }
    },[])

    //RENDER
    const {Title} =Typography;
    return(
        <>
        <div className={cssClasses.chatPrevGroup}>
            <Title level={4} style={{color:"#e6e6e6"}}>Chats</Title>
        </div>
        <div style={{color:"white"}}>
            {(props.userlist)?props.userlist.map((singleUser)=>(
                <ChatGroups userData={singleUser} key={singleUser.userID} />
            )):null}
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
      user: state.user.currentUser,
      chatlist:state.chat.chatList,
      userlist:state.chat.userList
    };
};
const mapDispatchToProps=dispatch=>{
    return {
        onGetRealTimeUserList:(chatList,currentUID)=>dispatch(actions.getRealTimeUserList(chatList,currentUID))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatPrevGroup);