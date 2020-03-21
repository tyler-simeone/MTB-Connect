import React, { useState } from "react";
import FriendsManager from "../../modules/FriendsManager";

const TrailRiderCard = props => {

  const requestId = props.request.id;

  // acceptFriendRequest() will change 'isAccepted' friend request property boolean from 'false' to 'true'
  const acceptFriendRequest = () => {
    // Had to make a new obj copy of the friend request so when fetch PUT runs it wont add the expanded property back to the DB
    const updatedRequest = {
      userId: props.request.userId,
      friendId: props.request.friendId,
      isRequestPending: props.request.isRequestPending,
      isAccepted: true
    };

    // friendRequestId is how the fetch PUT knows which object to update
    const friendRequestId = props.request.id;

    FriendsManager.updateRequest(updatedRequest, friendRequestId).then(() => {
      props.updatedRequests(requestId)
      // props.updatedRequests(friendRequestId);
    });
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
