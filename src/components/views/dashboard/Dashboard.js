import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { globalAuthState } from "../../../index";
import { getUserDocument, uploadAvatar } from "../../../firebase";
const Dashboard = () => {
  const [currentUser, setCurrentUser] = useRecoilState(globalAuthState);
  const [localState, setLocalState] = useState({
    isCurrentUserLoaded: false,
    avatarFile: null,
    avatarPreviewUrl: null,
  });
  const { avatarFile, avatarPreviewUrl } = localState;
  const { userId } = currentUser;
  useEffect(() => {
    getUserDocument(userId).then((res) => {
      setCurrentUser({ ...currentUser, ...res });
    });
  }, []);
  console.log("get user profile", currentUser);
  const { email, name, isCurrentUserLoaded } = currentUser.profile || {};
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
    uploadAvatar(currentUser, avatarFile);
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
  return (
    <div>
      <h1>Dashboard here</h1>
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
        <button onClick={() => alert("ADD MOVIE")}>Add Movie</button>
      </div>
    </div>
  );
};

export default Dashboard;
