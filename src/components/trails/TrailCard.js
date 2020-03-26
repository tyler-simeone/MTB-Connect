import React from "react";
import { Link } from "react-router-dom";
import "./TrailCard.css";

const TrailCard = props => {
  return (
    <>
      <div className="trailCardContainer">
        <img
          src={`${props.trail.img}`}
          alt={`${props.trail.name}`}
          height="237"
          width="296"
        />

        <div className="stackContent">
          <section className="trailInfo">
            <h2>{props.trail.name}</h2>
            <p>{props.trail.description}</p>
          </section>

          <div className="trailCardButtonContainer">
            <Link to={`/trails/${props.trail.id}`}>
              <button className="trailCardButton" type="button">
                Details
              </button>
            </Link>
            {props.trail.creatorId === props.activeUserId ? (
              <Link to={`/trails/${props.trail.id}/edit`}>
                <button className="trailCardButton" type="button">
                  Edit
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrailCard;
