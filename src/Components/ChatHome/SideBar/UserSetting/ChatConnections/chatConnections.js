import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Typography,Spin} from 'antd';

import 'antd/dist/antd.css';

import cssClasses from './chatConnections.module.css';
import ChatGroups from '../../ChatGroups/chatGroup';

function ChatConnections (props){
    const {Title} =Typography;
    const [groupLoading,setGroupLoading]=useState(false);
    const {userGroupList}=props;
    //CALLING FUNCTION
    
    useEffect(() => {
        if(userGroupList.length==0){
            setGroupLoading(true);
        }else{
            setGroupLoading(false)
        }
    },[userGroupList])
 
    return(
        <>
        <div className={cssClasses.chatConnections}>
            <Title level={4} style={{color:"#e6e6e6"}}>Connections</Title>
        </div>
        <Spin spinning={groupLoading}>
            <div style={{color:"white"}}>
                {(userGroupList.length!==0 )? Object.values(userGroupList).map((grp)=>(
                    <ChatGroups userData={grp} key={grp.gID}/>
                )):<p>No connections added till now!</p>}
            </div>
        </Spin>
        </>
    )
}
const mapStateToProps = state => {
    return {
        userGroupList: state.chat.userGroupList
    };
};
export default connect(mapStateToProps)(ChatConnections);