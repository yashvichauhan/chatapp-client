import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCNuTnesk4FgGLjMbhoy8_WHU8m0-ZwH6I",
    authDomain: "chatapp-789ae.firebaseapp.com",
    databaseURL: "https://chatapp-789ae.firebaseio.com",
    projectId: "chatapp-789ae",
    storageBucket: "chatapp-789ae.appspot.com",
    messagingSenderId: "951721808038",
    appId: "1:951721808038:web:3b0f5c1fe5b3fbf1fe2467"
};
// Initialize Firebase
const fire=firebase.initializeApp(firebaseConfig);

export default fire;
