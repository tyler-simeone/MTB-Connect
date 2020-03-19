import React from "react";
import "./Trails.css";

const TrailCard = props => {
  return (
    <>
      <div className="trailCardContainer">
        <figure className="imageContainer">
          <img src={require(`${props.trail.img}`)} alt="Trail Image" />
        </figure>
        <button onClick={props.history.push("/traildetails")} type="button">Details</button>
        <section className="trailCard">
          <h2>{props.trail.name}</h2>
          <p>{props.trail.description}</p>
        </section>
      </div>
    </>
  );
};

export default TrailCard;
