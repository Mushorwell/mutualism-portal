import firebase from 'firebase';
var app;
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDMsGBZWFi8ZzmuU7qert3iJ790NE_2Ggc",
    authDomain: "mutualism-ecb2c.firebaseapp.com",
    projectId: "mutualism-ecb2c",
    storageBucket: "mutualism-ecb2c.appspot.com",
    messagingSenderId: "1064106999487",
    appId: "1:1064106999487:web:6aa6ce425a9e573f24900a",
    measurementId: "G-7F2JM2J359"
};

// check for firebase init status and initialise using configuration settings
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

//sign up
export const authentication = firebase.auth();
export {firebase}