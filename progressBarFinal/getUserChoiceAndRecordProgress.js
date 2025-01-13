
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getFirestore, getDoc, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
    return localStorage.getItem("userId");    
}

async function englishFluency() {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const userData = await userDoc.data();

    if (userData["How good is your English?"] === "I am comforatble in understanding english.") {
        return true;
    } 
    else {
        return false;
    }
}

async function doesRoadMapExists() {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const userData = await userDoc.data();

    if (userData.hasOwnProperty("roadMapGenerated")) {
        return true;
    }
    else {
        return false;
    }
}

async function getTopics() {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const userData = await userDoc.data();

    return userData["topics"];
}

async function getUserChoice() {

    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const userData = await userDoc.data();

    const userCareerChoice = userData["careerName"];
    return userCareerChoice;
} 

async function storePathInDB(topics) {
    let userData = {"topics": topics, "roadMapGenerated":true};
    const docRef = await doc(db, "users", uid);

    try {
        await setDoc(docRef, userData, {merge:true});
        console.log("Road Map Saved.");
    }
    catch (error) {
        console.error("RoadMap updation failed:", error);
    }
};

async function storeProgress(moduleId) {
    let userData = {"lastCompletedModule":moduleId};
    const docRef = await doc(db, "users", uid);

    try {
        await setDoc(docRef, userData, {merge:true});
        console.log("Progress Stored.");
    }
    catch (error) {
        console.error("Failed to store progress:", error);
    }
}

async function getUserProgress() {

    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const userData = await userDoc.data();

    if (userData.hasOwnProperty('lastCompletedModule')) {
        return userData["lastCompletedModule"];
    }
    else {
        return 0;
    }
}

export {getUserChoice, storePathInDB, storeProgress, getUserProgress, doesRoadMapExists, getTopics, englishFluency};