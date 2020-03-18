import React, { useState, useEffect } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

const Trails = props => {
  const [zipcode, setZipcode] = useState({ zipcode: "" });
  const [trails, setTrails] = useState([]);

  const getTrails = () => {
    // For some reason this code isn't updating the trails state... (setTrails re-renders page & is async so won't see update yet b4 page relod)
    return TrailsManager.getAll().then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };

  useEffect(() => {
    getTrails();
  }, []);

  const findMatchingTrails = () => {
    trails.filter(
      trail => trail.zipcode === zipcode.zipcode
    );
  } 

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

      <form onSubmit={findMatchingTrails} className="trailSearchBox">
        <input
          id="zipcode"
          type="text"
          onChange={handleFieldChange}
          placeholder="Enter Zip Code"
        ></input>
        <button type="submit">Search</button>
      </form>

      {matchingTrails === null ? (
        <div className="searchDescriptionContainer">
          <h1 className="searchDescription">Search For Nearby Trails!</h1>
        </div>
      ) : (
        <div>
          <section>
            {matchingTrails.map(trail => {
              return <TrailCard key={trail.id} trail={trail} {...props} />;
            })}
          </section>
        </div>
      )}
    </>
  );
};

export default Trails;
