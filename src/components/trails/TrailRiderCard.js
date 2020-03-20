import React from "react";
import { Link } from "react-router-dom";
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
        {/* Insert 'Add Friend' Icon here as Link component when ready */}
        {/* Thinking should just redirect to new page w/ form to add friend, stretch goal will be to do it all on same trail detail page */}
        <Link to={`/trails/addFriend`} className="addFriendButton">
          <button className="addFriend">Add Friend</button>
        </Link>
      </div>
    </>
  );
};

export default TrailRiderCard;
