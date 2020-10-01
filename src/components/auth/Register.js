import React, { useState } from "react";
import LoginManager from "../../modules/LoginManager";
import RegisterManager from "../../modules/RegisterManager";
import "./Register.css";

const Register = props => {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    confirm_email: "",
    avatar_img: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };

    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleRegister = evt => {
    evt.preventDefault();

    if (credentials.first_name === "") {
      window.alert("Please enter a valid name");
    } else if (credentials.username === "") {
      window.alert("Please enter a valid username");
    } else if (credentials.email === "") {
      window.alert("Please enter a valid email address");
    } else if (credentials.email !== credentials.confirm_email) {
      window.alert("Emails provided do not match");
    } else if (credentials.password === "") {
      window.alert("Please enter a valid password");
    } else {
      LoginManager.getAll().then(users => {
        if (
          users.find(
            user =>
              user.user.email === credentials.email 
          )
        ) {
          window.alert("A user is already registered with this email");
        } else if (
          users.find(
            user =>
              user.user.username === credentials.username
          )
        ) {
          window.alert("A user is already registered with this username");
        } else {
          const newUser = {
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            username: credentials.username,
            password: credentials.password,
            email: credentials.email,
            avatar_img: credentials.avatar_img
          };
          setIsLoading(true);

          RegisterManager.post(newUser).then((resp) => {

            props.setUser(resp.user_id, resp.token);

            props.history.push("/trails");
          });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="registerFormContainer">
        <fieldset>
          <div className="fullNameContainer">
            <label htmlFor="registerName">First Name:</label>
            <input
              onChange={handleFieldChange}
              type="text"
              id="first_name"
              autoFocus=""
            ></input>
          </div>
          <div className="fullNameContainer">
            <label htmlFor="registerName">Last Name:</label>
            <input
              onChange={handleFieldChange}
              type="text"
              id="last_name"
              autoFocus=""
            ></input>
          </div>
          <div className="usernameContainer">
            <label htmlFor="registerUsername">Username:</label>
            <input
              onChange={handleFieldChange}
              type="text"
              id="username"
            ></input>
          </div>
          <div className="passwordContainer">
            <label htmlFor="password">Password:</label>
            <input
              onChange={handleFieldChange}
              type="password"
              id="password"
            ></input>
          </div>
          <div className="emailContainer">
            <label htmlFor="registerEmail">Email:</label>
            <input
              onChange={handleFieldChange}
              type="email"
              id="email"
            ></input>
          </div>
          <div className="confirmEmailContainer">
            <label htmlFor="confirm_email">Confirm Email:</label>
            <input
              onChange={handleFieldChange}
              type="email"
              id="confirm_email"
            ></input>
          </div>
          <div className="avatarContainer">
            <label htmlFor="avatarImg">Profile Image:</label>
            <input
              onChange={handleFieldChange}
              type="text"
              id="avatarImg"
              placeholder="Image url"
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
