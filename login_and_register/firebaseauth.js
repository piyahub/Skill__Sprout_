
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

// Create User

const signUp = document.getElementById('signUpBtn')
signUp?.addEventListener('click', async (e)=>{
    e.preventDefault();

    const email=document.getElementById('remail').value;
    const password=document.getElementById('rpassword').value;
    const firstName=document.getElementById('firstName').value;
    const lastName=document.getElementById('lastName').value;

    if(!email || !password || !firstName || !lastName) {
        alert('All fields are required.');
        return;
    }

    const auth=getAuth()
    const db=getFirestore();
    
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const displayName = `${firstName} ${lastName}`;
        await updateProfile(user, {displayName: displayName});

        console.log(`user with profile name ${displayName} created.`);

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName, 
            uid: user.uid,
        }
  
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, userData);

        console.log('user data written to firestore')

        window.location.href = './logIn.html';
    }   
    catch (error){
        console.log('Error', error);
        if (error.code === 'auth/email-already-in-use') {
            alert('Eamil Already Registered.');
        }
        else {
            alert('Unable to create user.');
        }
    }
});

// Log In existing user

const logIn = document.getElementById('logInBtn');
logIn?.addEventListener('click', async (e) => {
    e.preventDefault();

    console.log('Getting Response');

    const email = document.getElementById('lemail').value;
    const password = document.getElementById('lpassword').value;

    const auth=getAuth();
    const db = getFirestore();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Logged in user:', user);

        const token = await user.getIdToken();
        localStorage.setItem('userId', user.uid);

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        console.log(userDoc);

        const userData = userDoc.data();
        if (userData.hasOwnProperty("careerName")) {
            window.location.href = `../userProfilePage/profilePage.html`;
        }
        else if (userData.hasOwnProperty("questionnaireCompleted")) {
            window.location.href = `../careerSug/suggestionPage.html`;
        }
        else {
            window.location.href = `../questionnaire/index.html`;
        }

    } catch (error) {
        console.error('Login error:', error);
        const errorCode = error.code;

        if (errorCode === 'auth/wrong-password') {
            alert('Incorrect password!');
        } else if (errorCode === 'auth/user-not-found') {
            alert('No user found with this email.');
        } else {
            alert('Login failed. ' + error.message);
        }
    }
});


    // createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential)=>{
    //     const user=userCredential.user;
    //     const userData={
        //         email: email,
        //         firstName: firstName,
        //         lastName: lastName,
        //     };
        //     const docRef = doc(db, 'users', user.uid);
        

        //     setDoc(docRef, userData)
        //     .then(()=>{
            //         window.location.href='login.html';
            //     })
            //     .catch((error)=>{
    //         console.error("error while writing the doc", error);
    //     })
    // })
    // .catch((error)=>{
        //     const errorCode=error.code;
        //     if(errorCode=='auth/email-already-in-use'){
            //         alert('Email Already Registered.');
            //     }
            //     else {
                //         alert('Unable to create user.');
                //     }
                // })


//-------------------------------------------------------------------------------------------

                // createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed up 
//         const user = userCredential.user;
//         console.log('successful');
//         window.location.href="index.html";
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log('failed', errorMessage);
//         // ..
//     });