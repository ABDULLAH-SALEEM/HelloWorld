import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBpPlIitEnioeosV9iICdPPBB-7Gt3yGIc",
    authDomain: "facebook-532ce.firebaseapp.com",
    projectId: "facebook-532ce",
    storageBucket: "facebook-532ce.appspot.com",
    messagingSenderId: "711895614981",
    appId: "1:711895614981:web:a7a3c66830ecec6e103e6c",
    measurementId: "G-DSYDDHX7F5"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

export {firebaseConfig,auth,db};
