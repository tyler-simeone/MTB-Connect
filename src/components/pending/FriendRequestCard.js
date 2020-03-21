import React, { useState } from "react";
import FriendsManager from "../../modules/FriendsManager";

const TrailRiderCard = props => {

  const acceptFriendRequest = () => {
    const updatedRequest = props.request
    updatedRequest.isAccepted = true
    const newRequestId = props.request.id
    // console.log(updatedRequest);
    // console.log(newRequestId);
    FriendsManager.updateRequest(updatedRequest, newRequestId)
  };

  return (
    <>
      <div className="friendRequestCardContainer">
        <figure className="riderImageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>
        <section className="trailRiderCard">
          <h2>{props.request.user.fullName}</h2>
          <p>{props.request.user.username}</p>
        </section>
        {/* Insert 'Add Friend' Icon here as Link component when ready */}
        {/* Thinking should just redirect to new page w/ form to add friend, stretch goal will be to do it all on same trail detail page */}
        <button onClick={acceptFriendRequest} className="acceptFriendBtn">
          Accept
        </button>
      </div>
    </>
  );
};

export default TrailRiderCard;
