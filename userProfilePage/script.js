import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getFirestore, getDoc, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAENZKAKNXtnXIoilHqFpDzHUF2wb0UOvo",
    authDomain: "proj0loginandregister.firebaseapp.com",
    projectId: "proj0loginandregister",
    storageBucket: "proj0loginandregister.firebasestorage.app",
    messagingSenderId: "923250048225",
    appId: "1:923250048225:web:68c51b91740c927ef90ba0"
}; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const uid = getUserId(); 

function getUserId() {
    return localStorage.getItem("userId");    
} 

async function getUserData() {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const userData = userDoc.data();
    return {"firstName": userData["firstName"],"careerName": userData["careerName"]}
}

const container = document.querySelector(".container");
const logOutBtn = document.getElementById("log-out");



document.addEventListener("DOMContentLoaded", async () => {
    const userInfo = await getUserData();    

    const userInfoItem = `<div class="profile">
                            <h1>${userInfo["firstName"]}</h1>
                            <p>Aspiriing to become an <span>${userInfo["careerName"]}</span></p>
                            <button class="see-progress">Progress</button>
                        </div>`

    container.innerHTML += userInfoItem;

    const profileBtn = document.querySelector(".see-progress");
    profileBtn.addEventListener("click", (e) => {
        window.location.href = "../progressBarFinal/index.html";
    })
});


logOutBtn.addEventListener("click", async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("user is signed in:", user.email);
        }
        else {
            console.log("No user logged in.");
            window.location.href = "../logIn.html";
        }
    })

    try {
        await signOut(auth);
        console.log("user signed out successfully.");
        localStorage.removeItem("userId");
        window.location.href = "../login_and_register/logIn.html";
    }
    catch(error) {
        console.log("Error signing out the user: ", error);
    }

});