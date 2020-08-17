import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { globalAuthState, globalMoviesState } from "../../../index";
import {
  getUserDocument,
  uploadAvatar,
  getUserMovieList,
} from "../../../firebase";

const Dashboard = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useRecoilState(globalAuthState);
  const [allMoviesState, setAllMovieState] = useRecoilState(globalMoviesState);

  const [localState, setLocalState] = useState({
    isCurrentUserLoaded: false,
    avatarFile: null,
    avatarPreviewUrl: null,
    movieList: null,
  });
  const { avatarFile, avatarPreviewUrl, isCurrentUserLoaded } = localState;
  const { userId, email, name } = currentUser;
  useEffect(() => {
    getUserDocument(userId).then((res) => {
      setCurrentUser({ ...currentUser, ...res }); //updated global auth state

      //get the movie base on the id list
      if (res.movieList && res.movieList.length !== 0) {
        getUserMovieList(res.movieList).then((resGetMovieList) => {
          setLocalState({
            ...localState,
            movieList: resGetMovieList,
            isCurrentUserLoaded: true,
          });
        });
      } else {
        setLocalState({
          ...localState,
          isCurrentUserLoaded: true,
        });
      }
    });

    //listId.map(id=>listObj.filter(i=>i.id===id))----idea for listing user movie list
  }, []);

  const fileChangeHandle = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    var reader = new FileReader();
    reader.onloadend = function () {
      var dataURL = reader.result;

      setLocalState({
        ...localState,
        avatarFile: file,
        avatarPreviewUrl: dataURL,
      });
    };
    reader.readAsDataURL(file); //for displaying review upload image
    console.log(localState);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    console.log("submit");
    uploadAvatar(currentUser, avatarFile).then((res) => {
      console.log(res);
    });
  };
  const displayImg = () => {
    let imgUrl;
    if (currentUser.photoURL === undefined && avatarPreviewUrl === null) {
      imgUrl =
        "https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png";
    } else if (currentUser.photoURL && !avatarPreviewUrl) {
      imgUrl = currentUser.photoURL;
    } else {
      imgUrl = avatarPreviewUrl;
    }
    return imgUrl;
  };
  console.log(
    "movie list from dashboard",
    allMoviesState,
    localState.movieList
  );
  return (
    <div>
      <h1>Dashboard here</h1>
      {isCurrentUserLoaded ? (
        <Fragment>
          <figure style={{ width: "200px", height: "200px" }}>
            <img style={{ width: "100%" }} alt="avatar" src={displayImg()} />
          </figure>
          <h2>{name}</h2>
          <h3>{email}</h3>
          <form onSubmit={submitHandle}>
            <input
              type="file"
              onChange={fileChangeHandle}
              name="avatar"
              accept={"image/png,image/jpg"}
            />
            <button>Save</button>
          </form>
          <div>
            <h2>My list</h2>

            <button
              onClick={() => {
                history.push("/add-movie");
              }}
            >
              Add Movie
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </div>
  );
};

export default Dashboard;
