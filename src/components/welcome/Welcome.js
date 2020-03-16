import React from "react";
import "./Welcome.css";

const Welcome = () => {
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
        <div className="buttonContainer">
          <button type="button" className="loginButton">
            Login
          </button>
          <button type="button" className="registerButton">
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
