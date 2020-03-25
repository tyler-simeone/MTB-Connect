import React, { useState, useEffect } from "react";
import TrailRiderCard from "./TrailRiderCard";
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
    console.log(stateToChange);
    // setTrail(stateToChange);
  };

  const updateTrailDescription = evt => {
    evt.preventDefault();
    setIsLoading(true);
    // will create new trail and then return user to trails page (where they will then have to search for that trail)
    TrailsManager.update(trail, props.trailId).then(() => {
      props.history.push(`/trails/${props.trail.id}`);
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

      <div className="trailCardContainer">
        <figure className="imageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>

        <section className="trailCard">
          <form onSubmit={updateTrailDescription}>
            <h2>{trail.name}</h2>
            <textarea
              placeholder={trail.description}
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
