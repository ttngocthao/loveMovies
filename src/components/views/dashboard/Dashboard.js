import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { globalAuthState } from "../../../index";
import { getUserDocument } from "../../../firebase";
const Dashboard = () => {
  const [currentUser, setCurrentUser] = useRecoilState(globalAuthState);
  const [localState, setLocalState] = useState({});
  const { userId } = currentUser;
  useEffect(() => {
    getUserDocument(userId).then((res) => {
      setCurrentUser({ ...currentUser, profile: res });
      console.log("get user profile", res);
    });
    console.log("testing");
  }, []);
  const { email, name } = currentUser.profile || {};
  return (
    <div>
      <h1>Dashboard here</h1>
      <h2>{name}</h2>
      <h3>{email}</h3>
      <div>
        <h2>My list</h2>
        <button onClick={() => alert("ADD MOVIE")}>Add Movie</button>
      </div>
    </div>
  );
};

export default Dashboard;
