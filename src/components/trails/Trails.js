import React, { useState, useEffect } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

// TODO: Something else you could do is get the zipcode state here, then on btn click redirect to a new TrailsList module, passing
// zipcode state down as a prop, then in that new component run useEffect() to get all and filter for props.zipcode (there the zipcode
// will exist before filter method runs...)
// Talk to instructor about a more DRY approach.

const Trails = props => {
  const [zipcode, setZipcode] = useState({ value: "" });
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

  // TODO: I need this to run after zipcode state is set... K now it is, but matchingTrails var is not updating to update page...
  let matchingTrails = ""
  const findMatchingTrails = (evt) => {
    // evt.preventDefault()
    console.log(matchingTrails)
    matchingTrails = trails.filter(trail => trail.zipcode === zipcode.value);
    console.log(matchingTrails)
    return matchingTrails;
  }
  // How do I get this var to hold the updated value after filter runs, need it to have global scope...
  

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
          id="value"
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
