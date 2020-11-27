import fire from '../../services/firebase';

export const findUsers=async(groups)=>{
    let users=[];
    const grpArray = Object.values(groups);
    Promise.all(grpArray.map((grp)=>{
        fire.firestore().collection('users').doc(grp.reciever).get()
        .then((snapShot)=>{
            users.push({...snapShot.data(),userID:snapShot.data().id});
        })
        .catch((err)=>{
            console.log(err)
        })
    }))
    return users;
}