import React, { useState } from "react";
import PropTypes from "prop-types";

const SignIn = (props) => {
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
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
