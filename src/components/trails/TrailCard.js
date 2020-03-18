import React from "react";
import "./Trails.css";

const TrailCard = props => {

  return (
    <>
      <section className="trailCard">
        <h2>{props.trail.name}</h2>
      </section>
    </>
  );
};

export default TrailCard;
