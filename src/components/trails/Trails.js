import React, { useState } from "react";
import "./Trails.css";

const Trails = props => {
  const [zipcode, setZipcode] = useState({ zipcode: "" });
  const [trails, setTrails] = useState([]);

  const getTrails = () => {
    
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...zipcode };
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange);
    setZipcode(stateToChange);
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

      <div className="trailSearchBox">
        <input
          id="zipcode"
          type="text"
          onChange={handleFieldChange}
          placeholder="Enter Zip Code"
        ></input>
      </div>
      <div className="searchDescriptionContainer">
        <h1 className="searchDescription">Search For Nearby Trails!</h1>
      </div>
    </>
  );
};

export default Trails;
