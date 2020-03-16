import React, { useState } from "react";

const Login = props => {
  const [credentials, setCredentials] = useState({ email: "" });

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange)
    setCredentials(stateToChange);
  };

  const handleLogin = evt => {
    evt.preventDefault();
    props.history.push("/home");
  };

  return (
    <>
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