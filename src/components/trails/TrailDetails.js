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

  // Second useEffect arg means watch the path and when it includes a trail Id (meaning this page is being loaded), then run useEffect().
  useEffect(() => {
    TrailsManager.get(props.trailId).then(trail => setTrail(trail));
  }, [props.trailId]);

  return (
    <div className="trailCardContainer">
      <figure className="imageContainer">
        {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
      </figure>

      <section className="trailCard">
        <h2>{trail.name}</h2>
        <p>{trail.description}</p>
      </section>
    </div>
  );
};

export default TrailDetails;
