import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = props => {
  return (
    <>
      <div className="backgroundImageContainer">
        <div className="registerButtonContainer">
          <Link to="/login">
            <button type="button" className="loginButton">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className="registerButton">
              Register
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
