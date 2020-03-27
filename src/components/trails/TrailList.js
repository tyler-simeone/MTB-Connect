import React, { useState } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

const TrailList = props => {
  const activeUserId = props.activeUserId;
  const [zipcode, setZipcode] = useState({ value: "" });
  const [trails, setTrails] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...zipcode };
    stateToChange[evt.target.id] = evt.target.value;
    setZipcode(stateToChange);
  };

  const findMatchingTrails = evt => {
    evt.preventDefault();

    TrailsManager.getSomeTrails(zipcode.value).then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };

  return (
    <>
      <div className="trailListContainer">
        <form onSubmit={findMatchingTrails} className="trailSearchBox">
          <div className="trailListImageContainer">
            {/* <img
              src={`${props.trail.img}`}
              alt={`${props.trail.name}`}
              height="237"
              width="296"
            /> */}
          </div>
          <input
            id="value"
            type="text"
            onChange={handleFieldChange}
            placeholder="Enter Zip Code"
            className="trailSearch"
          ></input>
          <button type="submit">Search</button>

          <button
            className="addTrailBtn"
            onClick={() => props.history.push("/trails/addTrail")}
          >
            Add a Trail
          </button>
        </form>

        <div className="dynamicTrailListContainer">
          {/* Before submit btn clicked and api fetch runs, trails.length is 0, after search its length is > than 0 so will render the cards!! */}
          {trails.length === 0 ? (
            <div className="searchDescriptionContainer">
              <h1 className="searchDescription">Search For Nearby Trails!</h1>
            </div>
          ) : (
            <div>
              <section>
                {trails.map(trail => {
                  return (
                    <TrailCard
                      key={trail.id}
                      activeUserId={activeUserId}
                      trail={trail}
                      {...props}
                    />
                  );
                })}
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrailList;
