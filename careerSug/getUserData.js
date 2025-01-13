import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getFirestore, getDoc, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
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
const db = getFirestore();
const uid = getUserId();

function getUserId() {
    const uid = localStorage.getItem('userId');
    return uid;
}
 

async function getUserData () {
    // const uid = "Hn66pYhI6iNtKP2Azf55gKIsIbQ2";

    // const db = getFirestore();

    const docRef = doc(db, 'users', uid);
    const userDoc = await getDoc(docRef);
    const userData = userDoc.data();

    const userName = userData["firstName"];
    const reqDetails = {
                            "english?" : userData["How good is your English?"],
                            "interests" : userData["What are you interested in?"],
                            "education" : userData["What is your highest level of education?"],
                       };
                       
    // console.log(userName, reqDetails);
    // document.dispatchEvent(new Event('userDataCollected'));
    return {reqDetails, userName};
}

async function setUserData(careerName) {
    // const db = getFirestore();

    let userData = {"careerName" : careerName};

    const docRef = doc(db, 'users', uid);

    try {
        await setDoc(docRef, userData, {merge:true});
        console.log('User Data Updated Successfully.');
    }
    catch (error) {
        console.error("Error updating user data: ", error);
    }
}

export {getUserData, setUserData};


getUserData();