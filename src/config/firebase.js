import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAfoEeKHSlOB0FA9uBdNu6Aqcm0PWs52Uk",
    authDomain: "umkc-commerceui.firebaseapp.com",
    databaseURL: "https://umkc-commerceui.firebaseio.com",
    projectId: "umkc-commerceui",
    storageBucket: "umkc-commerceui.appspot.com",
    messagingSenderId: "194630815025",
    appId: "1:194630815025:web:bcf01024014034862b3410",
    measurementId: "G-2N09QM4G99"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  console.log(provider);
  auth.signInWithPopup(provider);
};