import * as reducerTypes from '../reducerType';
import fire from '../../services/firebase';
import firebase from 'firebase';

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
            }
            //dispatch({ type: reducerTypes.ON_CREATE_CONNECTION, connectionData: connectionData })
        })
        .catch((err)=>{
            reject("User not found please try another email.");
        })
    })

export const toggleConnection=()=>{
    return{
        type:reducerTypes.TOGGLE_CONNECTION,
    }
}

export const newChatAdded=()=>{
    return{
        type:reducerTypes.NEWCHAT_ADDED,
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
        stakeholders:sArr
    })
    .then((data)=>{
        resolve("message added");
        dispatch(newChatAdded());
    })
    .catch((err)=>{
        reject(err);
    })
})

export const getRealtimeConvoSuccess=(convo)=>{
    return {
        type:reducerTypes.GET_REALTIME_CONVERSATIONS_SUC,
        convo:convo
    }
}

export const getRealtimeConvoFail=()=>{
    return {
        type:reducerTypes.GET_REALTIME_CONVERSATIONS_FAIL,
    }
}

export const getRealTimeConversations=(currentUser,currentGroup)=>{
    return async dispatch=>{
        let unsubcribe = fire.firestore().collection('chats')
        .where('groupID','==',currentGroup.gID)
        .orderBy('createdAt')
        .onSnapshot((querySnapShot)=>{
            const conversations=[];
            querySnapShot.forEach((doc)=>{
                conversations.push({...doc.data(),MID:doc.id});
            })
            dispatch(getRealtimeConvoSuccess(conversations));
        })
        return unsubcribe;
    }
}

export const showConnection=(user)=>dispatch=>new Promise(function(resolve,reject){
    const currentUID = user.userID;
    let totalgroups=[];
    fire.firestore().collection('groups')
    .where("gtype","==","personal")
    .where("participants","array-contains",currentUID)
    .get()
    .then((querySnapShot)=>{
        querySnapShot.forEach(async(doc)=>{
           const rID=doc.data().participants.filter(uid=>uid!==currentUID);
           const user= await fire.firestore().collection('users').doc(rID[0]).get()
           totalgroups.push({...doc.data(),reciever:{...user.data(),userID:user.id,gID:doc.id}});
           dispatch({type:reducerTypes.GROUP_UPDATE,totalgroups:totalgroups});
        })
        resolve(totalgroups);
    })
    .catch((err) =>{
        reject(err)
    });
})


