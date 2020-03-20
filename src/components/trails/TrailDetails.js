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
  
  // Runs on 'View Recent Riders' btn click
  const findTrailUsers = () => {
    // so Kristen helped me change the qs parameters in my fetch call so now fetching the join-table w/ only the objects whose trailId
    // matches the id of the trail being viewed, and we're expanding the users to get all the data we need for our Riders cards.
    UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
      setRiders(usersWithTrails);
    });
  };

  //   TODO: this fn should 1) add user to trailUsers table as a new user of that trail, and 2) set isClicked state to true (renders)
  const addRecentRider = () => {
    const activeUserId = sessionStorage.getItem("Active User Id");

    const newUser = {
      userId: parseInt(activeUserId),
      trailId: props.trailId
    };

    UsersManager.addUserWithTrail(newUser).then(() => {
      UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
        setRiders(usersWithTrails);
      });
    });
  };

  // Just to view the current Trail Details
  // Second useEffect arg means watch the path and when it includes a trail Id (meaning this page is being loaded), then run useEffect().
  useEffect(() => {
    TrailsManager.get(props.trailId).then(trail => setTrail(trail));
  }, [props.trailId]);

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

      <div className="trailCardContainer">
        <figure className="imageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>

        <section className="trailCard">
          <h2>{trail.name}</h2>
          <p>{trail.description}</p>
        </section>

        {/* TODO: when this btn is clicked, need to bring up a list of recent riders (fetch all users from DB w/ matching trailId, create a 
        rider card, and map every rider in a card) */}
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
        >
          I've Ridden Here Recently!
        </button>
      </div>

      {riders.length === 0 ? null : (
        <section className="recentRidersContainer">
          {riders.map(rider => {
            return <TrailRiderCard key={rider.id} trailId={props.trailId} rider={rider} {...props} />;
          })}
        </section>
      )}
    </>
  );
};

export default TrailDetails;
