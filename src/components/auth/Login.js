import React, { useState } from "react";
import LoginManager from "../../modules/LoginManager";
import "./Login.css";

const Login = props => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = evt => {
    evt.preventDefault();
    
    if (credentials.username === "") {
      window.alert("Please enter a valid username");
    } else {
      LoginManager.post(credentials).then(resp => {
        if (resp.valid) {
          props.setUser(resp.user_id, resp.token);
          props.history.push("/trails");
        } else {
            window.alert("Invalid username or password")
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="loginFormContainer">
        <fieldset>
          <label htmlFor="loginInputField">Username:</label>
          <input
            onChange={handleFieldChange}
            type="username"
            id="username"
            placeholder="username"
            autoFocus=""
          ></input>

          <label htmlFor="loginInputField">Password:</label>
          <input
            onChange={handleFieldChange}
            type="password"
            id="password"
          ></input>
          <button type="submit">Sign in</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
