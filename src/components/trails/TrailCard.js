import React from "react";
import { Link } from "react-router-dom"
import "./TrailCard.css";

const TrailCard = props => {
  return (
    <>
      <div className="trailCardContainer">
        <figure className="imageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>
        <Link to="/traildetails">
          <button type="button">Details</button>
        </Link>
        <section className="trailCard">
          <h2>{props.trail.name}</h2>
          <p>{props.trail.description}</p>
        </section>
      </div>
    </>
  );
};

export default TrailCard;
