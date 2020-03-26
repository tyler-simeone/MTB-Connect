import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = props => {
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
