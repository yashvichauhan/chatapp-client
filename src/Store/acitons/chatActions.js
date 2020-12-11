import * as reducerTypes from '../reducerType';
import fire from '../../services/firebase';
import firebase from 'firebase';
import reducer from '../chat';

//CREATE CONNECTION
export const createConnection=(connectionData,userData)=>
    (dispatch)=>new Promise(function(resolve,reject){
        let user=null;
        let partArray=[];
        const currentUID =userData.userID;
        partArray.push(currentUID);
        fire.firestore().collection('users')
        .where('email','==',connectionData.email)
        .get()
        .then((querySnapShot)=>{
            if(!querySnapShot.empty){
                querySnapShot.forEach((doc)=>{
                    user={...doc.data(), userID:doc.id}
                })
                partArray.push(user.userID);
                fire.firestore().collection('groups')
                .add({
                    gname:"",
                    gtype:"personal",
                    participants:partArray,
                    messages:[],
                    createdBy:currentUID
                })
                .then(async (docRef)=>{
                    await Promise.all(partArray.map((uid)=>{
                        fire.firestore().collection('users').doc(uid)
                        .update({
                            groups:firebase.firestore.FieldValue.arrayUnion(docRef.id)
                        })
                    }))
                    .then((res)=>{
                        resolve(user);
                    })
                })
                .catch((err)=>{
                    reject(err);
                })
            }else{
                reject("User not found!");
            }
            //dispatch({ type: reducerTypes.ON_CREATE_CONNECTION, connectionData: connectionData })
        })
        .catch((err)=>{
            reject("User not found please try another email.");
        })
    })
//TOGGLE CONNECTION
export const toggleConnection=()=>{
    return{
        type:reducerTypes.TOGGLE_CONNECTION,
    }
}
//ADD NEW CHAT
export const newChatAdded=()=>{
    return{
        type:reducerTypes.NEWCHAT_ADDED,
    }
}
export const newChatAddFail=()=>{
    return{
        type:reducerTypes.NEWCHAT_ADD_FAIL,
    }
}

export const newChatAdd=(msgObj)=>(dispatch)=>new Promise(function(resolve,reject){
    let rArr = [];
    let sArr=[];
    rArr.push(msgObj.reciever);
    sArr.push(msgObj.author);
    fire.firestore().collection('chats')
    .add({
        author:msgObj.author,
        groupID:msgObj.groupID,
        msgContext:msgObj.msgContext,
        recievers:rArr,
        createdAt:new Date(),
        forwardCount:-1,
        stakeholders:sArr,
        readFlag:false
    })
    .then((data)=>{
        resolve("message added");
        fire.firestore().collection('groups').doc(msgObj.groupID)
        .set({
            chatFlag:true
        },{merge:true});
        dispatch(newChatAdded());
    })
    .catch((err)=>{
        dispatch(newChatAddFail());
        reject(err);
    })
})
//ADD NEW FORWARDED MESSAGE 
export const forwardMessageAdded=()=>{
    return{
        type:reducerTypes.FORWARD_MESSAGE_ADDED,
    }
}
export const forwardMessageAddFail=()=>{
    return{
        type:reducerTypes.FORWARD_MESSAGE_ADD_FAIL,
    }
}
export const newforwardMessageAdd=(msgObj)=>(dispatch)=>new Promise(function(resolve,reject){
    fire.firestore().collection('chats')
    .add({
        author:msgObj.author,
        groupID:msgObj.groupID,
        msgContext:msgObj.msgContext,
        recievers:msgObj.rArr,
        createdAt:new Date(),
        forwardCount:msgObj.flg,
        stakeholders:msgObj.sArr,
        originID:msgObj.originID,
        readFlag:false
    })
    .then((data)=>{
        fire.firestore().collection('groups').doc(msgObj.groupID)
        .set({
            chatFlag:true
        },{merge:true});
        dispatch(forwardMessageAdded());
        resolve("Forward message added");
    })
    .catch((err)=>{
        dispatch(forwardMessageAddFail());
        reject(err);
    })
})

//GET REAL TIME CONVERSATIONS
export const getRealtimeConvoSuccess=(convo)=>{
    return {
        type:reducerTypes.GET_REALTIME_CONVERSATIONS_SUC,
        convo:convo,
    }
}

export const getRealtimeConvoFail=()=>{
    return {
        type:reducerTypes.GET_REALTIME_CONVERSATIONS_FAIL,
    }
}

export const getRealTimeConversations=(gID)=>{
    return async dispatch=>{
        let unsubcribe = fire.firestore().collection('chats')
        .where('groupID','==',gID)
        .orderBy('createdAt')
        .onSnapshot((querySnapShot)=>{
            let conversations={};
            let singleConv=[];
            let groupToUpdate='';
            querySnapShot.forEach(async (doc)=>{
                singleConv.push({...doc.data(),MID:doc.id});
                groupToUpdate=doc.data().groupID;
            })
            conversations[groupToUpdate]=singleConv;
            dispatch(getRealtimeConvoSuccess(conversations));
        })
        return unsubcribe;
    }
}

//SHOW CHAT LIST REAL TIME
export const getRealtimeChatSuccess=(chatlist)=>{
    return {
        type:reducerTypes.GET_REALTIME_CHAT_SUC,
        chatList:chatlist
    }
}

export const getRealtimeChatFail=()=>{
    return {
        type:reducerTypes.GET_REALTIME_CHAT_FAIL,
    }
}

export const getRealTimeChatList=(currentUser)=>{
    const currentUID = currentUser.userID;
    return async dispatch=>{
        let unsubcribe = fire.firestore().collection('groups')
        .where("participants","array-contains",currentUID)
        .where('chatFlag','==',true)
        .onSnapshot((querySnapShot)=>{
            const chatList=[];
            querySnapShot.forEach((doc)=>{
                const rID=doc.data().participants.filter(uid=>uid!==currentUID);
                chatList.push({...doc.data(),gID:doc.id,chatUserID:rID[0]})
            })
            dispatch(getRealtimeChatSuccess(chatList));
        })
        return unsubcribe;
    }
}
//SHOW USERS REAL TIME
export const getRealtimeUserSuccess=(userList)=>{
    return {
        type:reducerTypes.GET_REALTIME_USER_SUC,
        userList:userList
    }
}

export const getRealtimeUserFail=()=>{
    return {
        type:reducerTypes.GET_REALTIME_USER_FAIL,
    }
}

export const getRealTimeUserList=(groupList,currentUID)=>{
    return async dispatch=>{
        const unsubcribe = fire.firestore().collection('users')
        .where("groups","array-contains-any",groupList)
        .onSnapshot((querySnapShot)=>{
            const userList=[];
            querySnapShot.forEach((doc)=>{
                if(doc.id!==currentUID){
                    const groupID=doc.data().groups.filter(gid => groupList.includes(gid))
                    userList.push({...doc.data(),userID:doc.id,gID:groupID[0]})
                }
            })
            dispatch(getRealtimeUserSuccess(userList));
        })
        return unsubcribe;
    }
}
//GET USERS GROUP
export const getRealtimeUserGroup=(userGroup)=>{
    return {
        type:reducerTypes.REALTIME_USER_GROUP,
        userGroup:userGroup
    }
}
export const getRealTimeUserGroup=(uID,groupID)=>{
    return async dispatch=>{
        let unsubcribe = fire.firestore().collection('users')
        .doc(uID)
        .onSnapshot((doc)=>{
            const userGroup={};
            userGroup[groupID]={...doc.data(),userID:doc.id,gID:groupID};
            dispatch(getRealtimeUserGroup(userGroup));
        })
        return unsubcribe;
    }
}

//GET REALTIME GROUPLIST
export const getRealtimeGroupSuc=(grpList)=>{
    return {
        type:reducerTypes.REALTIME_GROUP_UPDATE,
        grpList:grpList
    }
}

export const getRealTimeGroupList=(currentUID)=>{
    return async dispatch=>{
        let unsubcribe = fire.firestore().collection('groups')
        .where("gtype","==","personal")
        .where("participants","array-contains",currentUID)
        .onSnapshot((querySnapShot)=>{
            const grpList=[];
            querySnapShot.forEach((doc)=>{
                const rID=doc.data().participants.filter(uid=>uid!==currentUID);
                grpList.push({...doc.data(),gID:doc.id,reciever:rID[0]})
            })
            dispatch(getRealtimeGroupSuc(grpList));
        })
        return unsubcribe;
    }
}
//CHANGE CURRENT CHAT
export const changeCurrentMsg=(currentMsg)=>{
    return {
        type:reducerTypes.CHANGE_CURRENT_MSG,
        currentMsg:currentMsg
    }
}
//DELETE MESSAGE
export const deletedMsg=()=>{
    return {
        type:reducerTypes.DELETED_MSG,
    }
}

export const deleteMessage=(MID,userID)=>(dispatch)=>new Promise(function(resolve,reject){
    fire.firestore().collection('chats').doc(MID)
    .update({
        deletedBy:firebase.firestore.FieldValue.arrayUnion(userID)
    })
    .then((res)=>{
        dispatch(deletedMsg());
        resolve(res);
    })
    .catch((err)=>{
        reject(err);
    })
})
//CURRENT GROUP DATA FETCH REALTIME 
export const onGetCurrentGroup=(currentGrp)=>{
    return {
        type:reducerTypes.GET_CURRENT_GROUPDATA,
        currentGrpData:currentGrp
    }
}

//CHANGE CURRENT GROUP 
export const onChangeCurrentGroup=(userdata)=>{
    return {
        type:reducerTypes.CNG_CURRENT_GROUP,
        groupData:userdata
    }
}

export const changeCurrentGroup=(userdata)=>{
    return async dispatch=>{
        let subscriptions=[];
        let unsubcribeGroup = fire.firestore().collection('groups')
        .doc(userdata.gID)
        .onSnapshot((doc)=>{
            let currentGrp={...doc.data(),gID:doc.id};
            dispatch(onGetCurrentGroup(currentGrp));
        })
        let unsubcribeUser= fire.firestore().collection('users')
        .doc(userdata.userID)
        .onSnapshot((doc)=>{
            let currentUser={...doc.data(),userID:doc.id,gID:userdata.gID}
            dispatch(onChangeCurrentGroup(currentUser));
        })
        subscriptions.push(unsubcribeGroup);
        subscriptions.push(unsubcribeUser)
        return subscriptions;
    }
}

//BLOCK A USER
export const onBlockUser=()=>{
    return {
        type:reducerTypes.ON_BLOCK_USER,
    }
}
export const blockUser=(groupID,userID)=>(dispatch)=>new Promise(function(resolve,reject){
    fire.firestore().collection('groups').doc(groupID)
    .update({
        blockedBy:firebase.firestore.FieldValue.arrayUnion(userID)
    })
    .then((res)=>{
        dispatch(onBlockUser());
        resolve(res);
    })
    .catch((err)=>{
        reject(err);
    })
})

//UNBLOCK A USER
export const onUnblockUser=()=>{
    return {
        type:reducerTypes.ON_UNBLOCK_USER,
    }
}
export const UnblockUser=(groupID,userID)=>(dispatch)=>new Promise(function(resolve,reject){
    console.log("inside unblock");
    fire.firestore().collection('groups').doc(groupID)
    .update({
        blockedBy: firebase.firestore.FieldValue.arrayRemove(userID)
    })
    .then((res)=>{
        dispatch(onUnblockUser());
        resolve(res);
    })
    .catch((err)=>{
        reject(err);
    })
})

//MESSAGE READ UNREAD
export const CheckUnreadMsg=(conversationsArr,userID)=>(dispatch)=>new Promise(function(resolve,reject){
    conversationsArr.map((msg)=>{
        if(!msg.readFlag && msg.author!==userID){
            fire.firestore().collection('chats').doc(msg.MID)
            .update({
                readFlag:true
            })
            .then(()=>{
                resolve("success");
            })
            .catch((err)=>{
                reject(err);
            })
        }
    })
})

