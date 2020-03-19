import React, { useState, useEffect } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

// TODO: Something else you could do is get the zipcode state here, then on btn click redirect to a new TrailsList module, passing
// zipcode state down as a prop, then in that new component run useEffect() to get all from DB and filter for props.zipcode (there the zipcode
// will exist before filter method runs...) OR, just pass down the filter method to that new component, and run that filter method on useEffect...
// (problem with that is, if I just redirect to new component on btn click, I can't pass any props from here to that component...)
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

  // TODO: Now running after zipcode state is set w/ input value, and returning the filtered trails to the global matchingTrails var, but the problem NOW is,
  // by the time this code runs, the JSX that maps over the new filtered array has already been rendered, so it's not re-rendering w/ updated 'matchingTrails' value
  let matchingTrails = ""
  const findMatchingTrails = (evt) => {
    evt.preventDefault()
    console.log(matchingTrails)
    matchingTrails = trails.filter(trail => trail.zipcode === zipcode.value);
    console.log(matchingTrails)
    return matchingTrails;
  }  

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

{/* Ideally, matchingTrails value will start as empty str, then update after filter method runs and re-render the 2nd JSX component */}
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
