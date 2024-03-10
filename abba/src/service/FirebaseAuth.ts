import { firebaseConfig } from './FirebaseConfig'
import { initializeApp } from "firebase/app";
import { FirebaseAuthentication, GetCurrentUserResult, SignInResult } from '@capacitor-firebase/authentication';


// Initialize Firebase
initializeApp(firebaseConfig);

//Register
// export const createUserWithEmailAndPassword = async (email:string,password:string) => {
//     const result:SignInResult = await FirebaseAuthentication.createUserWithEmailAndPassword({
//       email: email,
//       password: password,
//     });
//     return result.user;
// };



//get current user
// export const getCurrentUser = async () => {
//     const result:GetCurrentUserResult = await FirebaseAuthentication.getCurrentUser();
//     return result.user;
// };

// export const signOut = async () => {
//     await FirebaseAuthentication.signOut();
// };

// export const deleteUser = async ()=>{
//     await FirebaseAuthentication.deleteUser()
// }



