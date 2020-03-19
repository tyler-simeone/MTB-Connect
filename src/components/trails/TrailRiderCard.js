import React from "react";
import { Link } from "react-router-dom"
import "./TrailRiderCard.css";

const TrailRiderCard = props => {
  return (
    <>
      <div className="trailRiderCardContainer">
        <figure className="riderImageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>
        <section className="trailRiderCard">
          <h2>{props.rider.user.fullName}</h2>
          <p>{props.rider.user.username}</p>
        </section>
      </div>
    </>
  );
};

export default TrailRiderCard;
