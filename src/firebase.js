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
      return { status: 400, errMsg: "document cannot be found" };
    }
  } catch (error) {
    console.error("Error fetching user", error);
    return { status: 400, errMsg: error };
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return { status: 400, errMsg: "User is invalid" };
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
      return { status: 200, msg: "user document successfully created" };
    } catch (error) {
      console.error("Error creating user document", error);
      return { status: 400, errMsg: "Error creating user document" };
    }
  }
  return getUserDocument(user.uid);
};

const getFileExtenstionForImg = (file) => {
  let fileExtension;
  if (file.type === "image/jpeg") {
    fileExtension = "jpg";
  }
  if (file.type === "image/png") {
    fileExtension = "png";
  }
  return fileExtension;
};

export const uploadAvatar = async (user, file) => {
  if (!user) return;

  const fileExtension = getFileExtenstionForImg(file);

  const imgRef = storageRef.child(
    `users/${user.userId}/avatar/${user.name}.${fileExtension}`
  );

  const userRef = firestore.doc(`users/${user.userId}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) {
    try {
      const imgSnapshot = await imgRef.put(file); //upload image to storage
      const imgUrl = await imgSnapshot.ref.getDownloadURL();
      // console.log("imgSnapshot", imgUrl);
      await userRef.update({
        photoURL: imgUrl,
      }); //update profile in database

      await auth.currentUser.updateProfile({
        photoURL: imgUrl,
      }); //update profile in auth

      return { status: 200, msg: "successfully updated avatar" };
    } catch (error) {
      console.error(error);
      return { status: 400, errorMsg: error };
    }
  } else {
    console.log("could not find snapshot");
  }
};

export const addMovie = async (data) => {
  try {
    const creator = await auth.currentUser;
    const {
      creatorView,
      genres,
      hasFinished,
      movieName,
      moviePoster,
      provider,
      series,
    } = data;
    //extra fields ---> creator: creator.uid,createAt: new Date(),adminApproved: false}

    //create a doc in moives collection
    const movieRef = await firestore.collection("movies").add({
      movieName,
      provider,
      series,
      creatorView,
      genres,
      hasFinished,
      creator: {
        userId: creator.uid,
        userName: creator.displayName,
        avatar: creator.photoURL,
      },
      createAt: new Date(),
      adminApproved: false,
    });
    console.log("movieRef", movieRef.id);

    //upload image to storage
    const fileExtension = getFileExtenstionForImg(moviePoster);
    const moviePosterRef = storageRef.child(
      `movies/${movieRef.id}/${movieName}.${fileExtension}`
    );
    const moviePosterSnapshot = await moviePosterRef.put(moviePoster);
    const moviePosterUrl = await moviePosterSnapshot.ref.getDownloadURL();
    //add poster to movies collection
    await movieRef.update({
      moviePoster: moviePosterUrl,
    });
    //get profile of the creator
    const userRef = await firestore.doc(`users/${creator.uid}`);
    //add the doc id to the user profile db
    await userRef.update({
      movieList: firebase.firestore.FieldValue.arrayUnion(movieRef.id),
    });
    console.log("successfully add movie");
  } catch (error) {
    console.error("error adding movie", error);
    return { status: 400, errorMsg: error };
  }
};

export const getAllMovies = async () => {
  try {
    let movieList = [];
    const querySnapshot = await firestore.collection("movies").get();

    querySnapshot.forEach((doc) => {
      movieList.push({ movieId: doc.id, ...doc.data() });
    });

    console.log("all movies", movieList);
    return movieList;
  } catch (error) {
    console.error("error getting all movies", error);
    return { status: 400, errorMsg: error };
  }
};

export const getUserMovieList = async (idListArr) => {
  if (idListArr.length <= 0) {
    console.log("nothing to get");
    return;
  }
  try {
    let movieList = [];
    idListArr.map(async (id) => {
      const movieObj = await firestore.doc(`movies/${id}`).get();
      if (movieObj) {
        movieList.push(movieObj.data());
      } else {
        console.log(`could not find movie with id=${id} `);
      }
    });
    return movieList;
  } catch (error) {
    console.error("error getting user movies", error);
    return { status: 400, errorMsg: error };
  }
};
