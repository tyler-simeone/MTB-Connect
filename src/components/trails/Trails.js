import React, { useState } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";

const Trails = props => {
  const [zipcode, setZipcode] = useState({ zipcode: "" });
  const [trails, setTrails] = useState([]);

  const getTrails = evt => {
    evt.preventDefault()

    TrailsManager.getAll().then(trailsFromApi => {

      const matchingTrails = trailsFromApi.filter(trail => trail.zipcode === zipcode.zipcode)

      console.log(matchingTrails)
      
      // setTrails(matchingTrails);
      

      // trailsFromApi.filter(trail => {
      //   if (trail.zipcode === zipcode.zipcode) {
      //     setTrails(trail);
      //     console.log(trails)
      //   }
      // });

    });
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...zipcode };
    stateToChange[evt.target.id] = evt.target.value;
    setZipcode(stateToChange);
    // console.log(stateToChange);
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
      <form onSubmit={getTrails} className="trailSearchBox">
        <input
          id="zipcode"
          type="text"
          onChange={handleFieldChange}
          placeholder="Enter Zip Code"
        ></input>
        <button type="submit">Search</button>
      </form>
      <div className="searchDescriptionContainer">
        <h1 className="searchDescription">Search For Nearby Trails!</h1>
      </div>
    </>
  );
};

export default Trails;
