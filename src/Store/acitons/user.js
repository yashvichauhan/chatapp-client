import * as actionTypes from '../reducerType';
import fire from '../../services/firebase'
const storage=fire.storage();

export const editProfile = (editData,email) => {
  return dispatch => {
    let flag=true;
    return new Promise(async(resolve, reject) => {
      let updateData={
        name:editData.name,
        aboutme:editData.aboutme,
        email:null,
        avatar:null
      }
      //CHECK IF EMAIL ALREADY EXISTS
      console.log(editData.email);
      if(email!==editData.email){
        updateData['email']=email;
        fire.firestore().collection('users')
        .where('email','==',editData.email)
        .get()
        .then((snapShot)=>{
          if(snapShot.empty){
            updateData['email']=editData.email;
          }else{
            flag=false;
            console.log("NOT WORKING");
            reject("Email already exists.");
          }
        })
      }else{
        updateData['email']=email;
      }
      //FILE UPDATION
      if(editData.fileFlag){
        const storageRef = storage.ref(`chatavatar/${Date.now()}`)
        const uploaded= await storageRef.put(editData.avatar)
        await storageRef.getDownloadURL()
        .then((downloadURL)=>{
          updateData['avatar']=downloadURL;
        })
        .catch((err)=>{
          flag=false;
          reject(err);
        })
      }else{
        updateData['avatar']=editData.avatar;
      }
      //UPDATE DATA
      console.log(flag);
      if(flag!==false){
        fire.firestore().collection('users').doc(editData.userID)
        .update(
          updateData
        )
        .then((res)=>{
          console.log("Upadtion success");
          dispatch({ type: actionTypes.ON_EDIT_USER, user: updateData });
          resolve("Profile updated success!");
        })
        .catch((err)=>{
          reject(err);
        })
      }
    });
  }
};