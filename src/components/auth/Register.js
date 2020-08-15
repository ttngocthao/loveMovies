import React, { useState } from "react";
import PropTypes from "prop-types";
import { generateUserDocument, auth } from "../../firebase";

const Register = (props) => {
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const { email, password, name } = values;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      //add name to user profile
      user.updateProfile({
        displayName: name,
      });
      generateUserDocument(user, { name });
    } catch (error) {
      console.log("error from frontend", error);
      return error;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>Register</h5>
        {/* <div>
          <label htmlFor="title">Title</label>
          <select name="title" onChange={handleChange}>
            <option value={0}>Select title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>
        </div> */}
        <div>
          <label htmlFor="name">Name</label>
          <input type="input" name="name" onChange={handleChange} />
        </div>
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

Register.propTypes = {};

export default Register;
