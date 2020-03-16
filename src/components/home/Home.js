import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <header className="header">
      <div className="header-banner-one"></div>
      <div className="header-banner-two">
        {/* Insert React Burger here */}
        <h1 className="text-size--large">MTB Connect</h1>
        {/* Insert avatar/link here */}
      </div>
    </header>
  );
};

export default Home;
