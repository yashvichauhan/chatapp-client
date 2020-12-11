import * as reducerTypes from '../reducerType';

import fire from '../../services/firebase';
import bcrypt from 'bcryptjs';

export const authStart=()=>{
    return{
        type:reducerTypes.AUTH_START
    }
}
export const authSuccess=(userData)=>{
    return{
        type:reducerTypes.AUTH_SUCCESS,
        userData:userData
    }
}
export const authFail=(error)=>{
    return{
        type:reducerTypes.AUTH_FAIL,
        errorMsg:error
    }
}
export const auth = (InputObj,authState)=>
    (dispatch)=>new Promise(function(resolve,reject){
        dispatch(authStart());
        //final signup
        if(authState==="signup"){
            fire.auth().createUserWithEmailAndPassword(InputObj.email,InputObj.password)
            .then(async (res)=>{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(InputObj.password, salt);
                const sendData={
                    id:res.user.uid,
                    name:InputObj.name,
                    email:InputObj.email,
                    country:InputObj.countryCode,
                    password:hash,
                    aboutme:"Hey there! I'm new Here.",
                    avatar:"",
                    groups:[],
                    isOnline:true
                }
                fire.firestore().collection('users')
                .add(sendData)
                .then((docRef=>{
                    const currentUser={...sendData, userID:docRef.id}
                    dispatch(authSuccess(currentUser));
                    resolve(currentUser);
                }))
                .catch((err)=>{
                    dispatch(authFail(err));
                    reject(err);
                })
            })
            .catch((err)=>{
                dispatch(authFail(err));
                reject(err);
            })    
        }
        else if(authState==='login'){
            fire.auth().signInWithEmailAndPassword(InputObj.email,InputObj.password)        
            .then(async (res)=>{
                if(res){
                    let currentUser=null;
                    await fire.firestore().collection('users')
                    .where('id',"==",res.user.uid)
                    .get()
                    .then(function(querySnapShot){
                        querySnapShot.forEach(doc => {
                            fire.firestore().collection('users')
                            .doc(doc.id)
                            .update({
                                isOnline:true
                            })
                            currentUser={...doc.data(), userID:doc.id};
                        });
                        dispatch(authSuccess(currentUser));
                        resolve(currentUser);
                    })
                    .catch((err)=>{
                        dispatch(authFail(err));
                        reject(err);
                    })
                }
            })
            .catch((err)=>{
                dispatch(authFail(err));
                reject(err);
            })
        }
        else{
            console.log("Authstate not working: "+authState)
        }
    })
export const logoutSuccess=()=>{
    return{
        type:reducerTypes.AUTH_LOGOUT,
    }
}
export const logoutFail=(err)=>{
    return{
        type:reducerTypes.LOGOUT_FAIL,
        error:err
    }
}
export const authLogout=(userID)=>{
    return async dispatch=>{
        fire.firestore().collection('users')
        .doc(userID)
        .update({
            isOnline:false,
            lastActive:new Date()
        })
        .then((res)=>{
            fire.auth().signOut()
            .then(()=>{
                localStorage.clear();
                console.log("Signout working");
                dispatch(logoutSuccess());
            })
            .catch((err)=>{
                console.log("Logout error: "+err);
                dispatch(logoutFail(err));
            })
        })
        .catch((err)=>{
            console.log("updation error"+err);
            dispatch(logoutFail(err));
        })
    }
}
