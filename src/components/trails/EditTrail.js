import React, { useState, useEffect } from "react";
import TrailsManager from "../../modules/TrailsManager";
// import "./TrailEdit.css";

const TrailEdit = props => {
  const [trail, setTrail] = useState({
    name: "",
    img: "",
    description: "",
    zipcode: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...trail };
    stateToChange[evt.target.id] = evt.target.value;
    setTrail(stateToChange);
  };

  const updateTrailDescription = evt => {
    evt.preventDefault();
    setIsLoading(true);
    
    // will create new trail and then return user to trails page (where they will then have to search for that trail)
    TrailsManager.update(trail, props.trailId).then(() => {
      props.history.push(`/trails/${props.trailId}`);
    });
  };

  // Gets the trail being viewed and sets trail state to display info on that trail
  useEffect(() => {
    TrailsManager.get(props.trailId).then(trail => setTrail(trail));
  }, []);

  return (
    <>
      <div className="trailCardContainer">
        <figure className="imageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>

        <section className="trailCard">
          <form onSubmit={updateTrailDescription}>
            <h2>{trail.name}</h2>
            <textarea
              value={trail.description}
              onChange={handleFieldChange}
              id="description"
            ></textarea>
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default TrailEdit;
