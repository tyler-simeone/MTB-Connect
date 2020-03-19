import React, { useState, useEffect } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

const Trails = props => {
  const [zipcode, setZipcode] = useState({ zipcode: "" });
  const [trails, setTrails] = useState([]);

  // Wasn't setting with filtered trails bc this runs first via useEffect so zipcode doesn't exist to filter with yet...
  const getTrails = () => {
    return TrailsManager.getAll().then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };

// TODO: Attempt 2 with incorporating the filter and setting into this func on btn click
  // let matchingTrails = "";

  // const getTrails = (evt) => {
  //   evt.preventDefault()

  //   return TrailsManager.getAll().then(trailsFromApi => {
  //     matchingTrails = trailsFromApi.filter(trail => trail.zipcode === zipcode.zipcode)
  //     setTrails(matchingTrails)
  //   });
  // };

// TODO: This runs SECOND, saves value of user input (zipcode) .... NOW NEED TO filter trails to a new array....
  const handleFieldChange = evt => {
    const stateToChange = { ...zipcode };
    stateToChange[evt.target.id] = evt.target.value;
    setZipcode(stateToChange)
  };
// TODO: This runs FIRST, sets trails state to arr of JSON DB trail objects
  useEffect(() => {
    getTrails();
  }, []);

  // TODO: I need this to run after zipcode state is set...
  const matchingTrails = trails.filter(trail => trail.zipcode === zipcode.zipcode);
  console.log(`Matching Trails: ${matchingTrails}`)

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

      <form className="trailSearchBox">
        <input
          id="zipcode"
          type="text"
          onChange={handleFieldChange}
          placeholder="Enter Zip Code"
        ></input>
        <button type="submit">Search</button>
      </form>

      {matchingTrails === "" ? (
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
