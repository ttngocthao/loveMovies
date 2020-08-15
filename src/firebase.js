import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storageRef = firebase.storage().ref();

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

export const uploadAvatar = async (user, file) => {
  if (!user) return;

  let fileExtension;
  if (file.type === "image/jpeg") {
    fileExtension = "jpg";
  }
  if (file.type === "image/png") {
    fileExtension = "png";
  }

  const imgRef = storageRef.child(
    `${user.userId}/avatar/${user.name}.${fileExtension}`
  );

  const userRef = firestore.doc(`users/${user.userId}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) {
    try {
      const imgSnapshot = await imgRef.put(file); //upload image to storage
      const imgUrl = await imgSnapshot.ref.getDownloadURL();
      console.log("imgSnapshot", imgUrl);
      await userRef.update({
        photoURL: imgUrl,
      }); //update profile in database
      console.log("update avatar to db");

      await auth.currentUser.updateProfile({
        photoURL: imgUrl,
      }); //update profile in auth
      console.log("update avatar to user auth");
      console.log("upload avatar successfully");
    } catch (error) {
      return { status: 400, errorMsg: error };
    }
  } else {
    console.log("could not find snapshot");
  }
};
