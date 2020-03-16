import React from "react";
import "./Trails.css";

const Trails = props => {
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

      <div className="trailSearchBox">
          <input type="text" placeholder="Enter Zip Code"></input>
      </div>
      <div className="searchDescriptionContainer">
          <h1 className="searchDescription">Search For Nearby Trails!</h1>
      </div>
    </>
  );
};

export default Trails