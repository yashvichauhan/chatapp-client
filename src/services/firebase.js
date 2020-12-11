import firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DBURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDERID,
    appId: process.env.REACT_APP_APPID
};
// Initialize Firebase
const fire=firebase.initializeApp(firebaseConfig);

export default fire;
