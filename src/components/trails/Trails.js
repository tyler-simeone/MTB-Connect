import React, { useState } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";

const Trails = props => {
  const [zipcode, setZipcode] = useState({ zipcode: "" });
  const [trails, setTrails] = useState([]);

  // TODO: either run the function here to get all trails from API and set them to state here on submit btn click, or redirect to 
  // different module (TrailsList) that does that...
  const getTrails = () => {
    // For some reason this code isn't updating the trails state... (setTrails re-renders page & is async so won't see update yet b4 page relod)
    return TrailsManager.getAll().then(trailsFromApi => {
      setTrails(trailsFromApi)
    })
  };

  const matchingTrails = trails.filter(trail => trail.zipcode === zipcode.zipcode)

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
      {trails === null ? 
      (<div className="searchDescriptionContainer">
        <h1 className="searchDescription">Search For Nearby Trails!</h1>
      </div>) :
      (<div>
        <section>
          {matchingTrails.map(trail => {
            
          })}
        </section>
      </div>)
      }
    </>
  );
};

export default Trails;
