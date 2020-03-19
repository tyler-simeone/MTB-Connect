import React, { useState, useEffect } from "react";
import "./TrailDetails.css";
import TrailsManager from "../../modules/TrailsManager";

const TrailDetails = props => {
  const [trail, setTrail] = useState({
    name: "",
    img: "",
    description: "",
    zipcode: ""
  });
  const [riders, setRiders] = useState([]);

  const findTrailUsers = () => {
    //   So right now this would get all objs from trailUsers table, and 'trailUsers' would hold all objs whose trailId matches the
    // trail whose details we're viewing. NOW we need to extrapolate the riders/users objs out to setRiders... 
    TrailUsersManager.getAll().then(users => {
        const trailUsers = users.filter(user => user.trailId === props.trailId);
        console.log(trailUsers)
    });

    // I think another option would be to save userId to 'trails' table's objs, then getAll users with trails (embed), and filter for
    // only users with trails whose trailId matches the trail being viewed. 
    UsersManager.getUsersWithTrails().then(usersWithTrails => {
        console.log(usersWithTrails)
    
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

      {/* {riders.length === 0 ? null : (
        <section className="recentRidersContainer">
          {riders.map(rider => {
            return <RiderCard key={rider.id} rider={rider} {...props} />;
          })}
        </section>
      )} */}
    </>
  );
};

export default TrailDetails;
