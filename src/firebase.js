import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    if (userDocument) {
      return userDocument.data();
    } else {
      return { msg: "document cannot be found" };
    }

    //return { uid: uid, msg: "Testing" ,profile: userDocument.data()};
  } catch (error) {
    console.error("Error fetching user", error);
    return error;
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  console.log("in generateDoc function");
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, name } = user;
    try {
      await userRef.set({
        name,
        email,
        memberSince: new Date(),
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
