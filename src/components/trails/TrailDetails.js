import React, { useState, useEffect } from "react";
import TrailRiderCard from "./TrailRiderCard";
import TrailsManager from "../../modules/TrailsManager";
import UsersManager from "../../modules/UsersManager";
import "./TrailDetails.css";

const TrailDetails = props => {
  const [trail, setTrail] = useState({
    name: "",
    img: "",
    description: "",
    zipcode: ""
  });
  const [riders, setRiders] = useState([]);

  const [isNewRiderLoading, setIsNewRiderLoading] = useState(false);

  // Runs on 'View Recent Riders' btn click
  const findTrailUsers = () => {
    UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
      setRiders(usersWithTrails);
    });
  };

  // Runs when user wishes to add his/herself as a recent rider of the trail
  const addRecentRider = () => {
    setIsNewRiderLoading(true);

    const newUser = {
      userId: props.activeUserId,
      trailId: props.trailId
    };

    UsersManager.addUserWithTrail(newUser).then(() => {
      UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
        setRiders(usersWithTrails);
      });
    });
  };

  // Gets the trail being viewed and sets trail state to display info on that trail
  useEffect(() => {
    TrailsManager.get(props.trailId).then(trail => setTrail(trail));
  }, []);

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

      <div className="trailDetailsContainer">
        <img
          src={`${trail.img}`}
          alt={`${trail.name}`}
          height="100%"
          width="296"
        />
        <div className="stackContent">
          <section className="trailInfo">
            <h2>{trail.name}</h2>
            <p>{trail.description}</p>
          </section>

          <div className="trailDetailsButtonContainer">
            <button
              onClick={findTrailUsers}
              className="viewRecentRiders"
              type="button"
            >
              View Recent Riders
            </button>
            <button
              onClick={addRecentRider}
              className="addRecentRider"
              type="button"
              disabled={isNewRiderLoading}
            >
              I've Ridden Here Recently!
            </button>
          </div>
        </div>
      </div>

      {riders.length === 0 ? null : (
        <section className="recentRidersContainer">
          {riders.map(rider => {
            return (
              <TrailRiderCard
                key={rider.id}
                activeUserId={props.activeUserId}
                rider={rider}
                findTrailUsers={findTrailUsers}
                {...props}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default TrailDetails;
