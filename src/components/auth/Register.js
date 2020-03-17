import React, { useState } from "react";
import LoginManager from "../../modules/LoginManager";
import RegisterManager from "../../modules/RegisterManager";
import "./Register.css";

const Register = props => {
  const [credentials, setCredentials] = useState({
    fullName: "",
    username: "",
    email: "",
    confirmEmail: "",
    avatarImg: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleRegister = evt => {
    evt.preventDefault();

    if (credentials.fullName === "") {
      window.alert("Please enter a valid name");
    } else if (credentials.username === "") {
      window.alert("Please enter a valid username");
    } else if (credentials.email === "") {
      window.alert("Please enter a valid email address");
    } else if (credentials.email !== credentials.confirmEmail) {
      window.alert("Emails do not match");
    } else {
      LoginManager.getAll().then(users => {
        if (
          users.find(
            user =>
              user.email === credentials.email ||
              user.username === credentials.username ||
              user.fullName === credentials.fullName
          )
        ) {
          window.alert("A user is already registered with these credentials");
        } else {
          const newUser = {
            fullName: credentials.fullName,
            username: credentials.username,
            email: credentials.email,
            avatarImg: credentials.avatarImg
          };
          setIsLoading(true);

          RegisterManager.post(newUser).then(() => {
            RegisterManager.getAll().then(users => {
              const activeUser = users.find(
                user => user.email === newUser.email
              );

              props.setUser(activeUser.id);

              props.history.push("/home");
            });
          });
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
      <form onSubmit={handleRegister} className="registerFormContainer">
        <fieldset>
          <div className="fullNameContainer">
            <label htmlFor="registerName">Full Name:</label>
            <input
              onChange={handleFieldChange}
              type="text"
              id="fullName"
              placeholder="Luke Skywalker"
              autoFocus=""
            ></input>
          </div>
          <div className="usernameContainer">
            <label htmlFor="registerUsername">Username:</label>
            <input
              onChange={handleFieldChange}
              type="text"
              id="username"
              placeholder="LukeIAmYoFather"
            ></input>
          </div>
          <div className="emailContainer">
            <label htmlFor="registerEmail">Email:</label>
            <input
              onChange={handleFieldChange}
              type="email"
              id="email"
              placeholder="lukeskywalker@gmail.com"
            ></input>
          </div>
          <div className="confirmEmailContainer">
            <label htmlFor="confirmEmail">Confirm Email:</label>
            <input
              onChange={handleFieldChange}
              type="email"
              id="confirmEmail"
              placeholder="Confirm email address"
            ></input>
          </div>
          <div className="avatarContainer">
            <label htmlFor="avatarImg">Profile Image:</label>
            <input
              onChange={handleFieldChange}
              type="text"
              id="avatarImg"
              placeholder="Save image link here"
            ></input>
          </div>
          <button type="submit" disabled={isLoading}>
            Register!
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Register;
