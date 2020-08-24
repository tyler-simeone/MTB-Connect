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
    avatar_img: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };

    let first_name = ""
    let last_name = ""

    if (evt.target.id === "fullName") {
      let fullName = evt.target.value
      String(fullName)
      const fullName_split = fullName.split(' ')
      first_name = fullName_split[0]
      last_name = fullName_split[1]

      stateToChange["first_name"] = first_name
      stateToChange["last_name"] = last_name
    }
    
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
    } else {
      LoginManager.getAll().then(users => {
        
        if (
          users.find(
            user =>
              user.user.email === credentials.email ||
              user.user.username === credentials.username ||
              (user.user.first_name === credentials.first_name &&
              user.user.last_name === credentials.last_name )
          )
        ) {
          window.alert("A user is already registered with these credentials");
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
