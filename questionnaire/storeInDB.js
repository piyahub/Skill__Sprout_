// const info = require('./script.js');
// import { userChoices, questions } from './script.js';


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAENZKAKNXtnXIoilHqFpDzHUF2wb0UOvo",
    authDomain: "proj0loginandregister.firebaseapp.com",
    projectId: "proj0loginandregister",
    storageBucket: "proj0loginandregister.firebasestorage.app",
    messagingSenderId: "923250048225",
    appId: "1:923250048225:web:68c51b91740c927ef90ba0"
};

const app = initializeApp(firebaseConfig);

async function store(questions, userChoices) {
    const db = getFirestore();
    // const uid = localStorage.getItem('userId');
    // const uid = "Hn66pYhI6iNtKP2Azf55gKIsIbQ2";

    const uid = localStorage.getItem('userId');

    // if (uid) {
    //     console.log('UserId', uid);
    // }
    // else {
    //     console.log('No such user.')
    //     return;
    // }

    // const userChoices = info.userChoices;
    // const questions = info.questions;
    let userData = {};
    questions.forEach((que, index) => {
        userData[que.question] = userChoices[index];
    });

    userData['questionnaireCompleted'] = true;

    const docRef = doc(db, 'users', uid);
    try {
        await setDoc(docRef, userData, { merge: true });
        console.log('User Data Updated Successfully.');
        return true;
    } catch (error) {
        console.error('Error Updating User Data: ', error);
        return false;
    }
}


export { store };

// document.addEventListener('userDataReady', () => {
//     store();
// });

