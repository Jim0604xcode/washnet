// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging,getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRz2oZiWPp-SZV8jjzOql7RCywVbXAPRs",
  authDomain: "abba-b19a0.firebaseapp.com",
  projectId: "abba-b19a0",
  storageBucket: "abba-b19a0.appspot.com",
  messagingSenderId: "384332916714",
  appId: "1:384332916714:web:4255243f9ce39c5ebf7493",
  measurementId: "G-9VBD72LMFG"
};

// Initialize Firebase

initializeApp(firebaseConfig);
const messaging = getMessaging();
export const requestForToken = () => {
    return getToken(messaging, { vapidKey: "BJ4e8QdbnO9RG4xYJ3sUO4N7XF-hGVvSqkvuRpSZL-RH2yNiLKRuppNLEt80LxLu-NUH3_MvB64rETkY6nbydGs" })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          prompt(JSON.stringify(currentToken))
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          prompt("No registration token available. Request permission to generate one.")
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        prompt("An error occurred while retrieving token.")
      });
  };