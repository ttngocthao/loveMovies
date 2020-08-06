import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useSetRecoilState } from "recoil";
import { globalAuthState } from "../../index";
const SignIn = (props) => {
  const [values, setValues] = useState({});
  const setCurrentUser = useSetRecoilState(globalAuthState);

  const history = useHistory();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("sign in successfully");
      history.push("/home");
    } catch (error) {
      return { msg: "Error while sign in", error };
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>Sign in</h5>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
