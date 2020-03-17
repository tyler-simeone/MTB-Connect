import React, { useState } from "react";
import LoginManager from "../../modules/LoginManager";
import "./Login.css";

const Login = props => {
  const [credentials, setCredentials] = useState({ email: "" });

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  // W/o the evt.preventDefault(), if user tries to submit an empty field, the form will still run/submit after the window alert.
  const handleLogin = evt => {
    evt.preventDefault();
    if (credentials.email === "") {
      window.alert("Please enter a valid email address");
    } else {
      LoginManager.getAll().then(users => {
        if (users.find(user => user.email === credentials.email)) {
          const user = users.find(user => user.email === credentials.email);

          props.setUser(user.id);
          props.history.push("/home");
        } else {
            window.alert("Invalid email")
        }
      });
    }
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
