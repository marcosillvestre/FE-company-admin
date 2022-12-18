import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDmSy8G0PzcMTcooRQvoj_0_JZ7_xAGrm8",
    authDomain: "fir-auth-b2638.firebaseapp.com",
    projectId: "fir-auth-b2638",
    storageBucket: "fir-auth-b2638.appspot.com",
    messagingSenderId: "495412095443",
    appId: "1:495412095443:web:22f111d6b22fd82005e726"
};

const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

export { firebase, auth, app };

