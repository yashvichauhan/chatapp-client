import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Typography,Spin} from 'antd';

import 'antd/dist/antd.css';

import cssClasses from './chatConnections.module.css';
import ChatGroups from '../../ChatGroups/chatGroup';

function ChatConnections (props){
    const {Title} =Typography;
    const [groupLoading,setGroupLoading]=useState(false);
    
    useEffect(() => {
        if(props.user.groups.length==0){
            setGroupLoading(false)
        }
        else if(props.groups===null){
            setGroupLoading(true);
        }else{
            setGroupLoading(false);
        }
    },[props.groups])
 
    return(
        <>
        <div className={cssClasses.chatConnections}>
            <Title level={4} style={{color:"#e6e6e6"}}>Connections</Title>
        </div>
        {console.log(props.groups)}
        <Spin spinning={groupLoading}>
            <div style={{color:"white"}}>
                {(props.user.groups.length==0)?(<p>No connections added till now!</p>):null}
                {(props.user.groups.length>0 && props.groups!==null && props.groups.length>0)?props.groups.map((grp)=>(
                    <ChatGroups userData={grp.reciever} key={grp.reciever.gID}/>
                )):null}
            </div>
        </Spin>
        </>
    )
}
const mapStateToProps = state => {
    return {
        groups:state.chat.groups,
        user:state.user.currentUser
    };
};
export default connect(mapStateToProps)(ChatConnections);