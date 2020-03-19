import React, { useState, useEffect } from "react";
import TrailRiderCard from "./TrailRiderCard"
import TrailsManager from "../../modules/TrailsManager";
import UsersManager from "../../modules/UsersManager"
import "./TrailDetails.css";

const TrailDetails = props => {
  const [trail, setTrail] = useState({
    name: "",
    img: "",
    description: "",
    zipcode: ""
  });
  // Will end up mapping 'riders' to render RiderCard (which will be a preview, and when clicked on [anywhere] will render RiderDetails)
  // to add rider as friend and send msg
  const [riders, setRiders] = useState([]);

  const findTrailUsers = () => {
    // so Kristen helped me change the qs parameters in my fetch call so now fetching the join-table and only the objects whose trailId
    // matches the id of the trail being viewed, and we're expanding the users to get all the data we need for our Riders cards.
    UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
        console.log(usersWithTrails)      
        setRiders(usersWithTrails)
    });
  };

  // Second useEffect arg means watch the path and when it includes a trail Id (meaning this page is being loaded), then run useEffect().
  useEffect(() => {
    TrailsManager.get(props.trailId).then(trail => setTrail(trail));
  }, [props.trailId]);

  return (
    <>
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
        <button className="addRecentRider" type="button">
          I've Ridden Here Recently!
        </button>
      </div>

      {riders.length === 0 ? null : (
        <section className="recentRidersContainer">
          {riders.map(rider => {
            return <TrailRiderCard key={rider.id} rider={rider} {...props} />;
          })}
        </section>
      )}
    </>
  );
};

export default TrailDetails;
