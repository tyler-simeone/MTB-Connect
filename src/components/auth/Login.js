import React, { useState } from "react";
import "./Login.css"

const Login = props => {
  const [credentials, setCredentials] = useState({ email: "" });

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange);
    setCredentials(stateToChange);
  };

  const handleLogin = evt => {
    evt.preventDefault();
    props.setUser(credentials);
    props.history.push("/home");
  };

  return (
    <>
      <header className="header">
        <div className="header-banner-one"></div>
        <div className="header-banner-two">
          {/* Insert React Burger here */}
          <h1 className="text-size--large">MTB Connect</h1>
          {/* Insert avatar/link here */}
        </div>
      </header>
      <form onSubmit={handleLogin} className="loginFormContainer">
        <fieldset>
          <label htmlFor="loginInputField">Email:</label>
          <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            placeholder="example@example.com"
            autoFocus=""
          ></input>
          <button type="submit">Sign in</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
