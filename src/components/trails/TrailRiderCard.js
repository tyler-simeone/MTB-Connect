import React, { useState } from "react";
import FriendsManager from "../../modules/FriendsManager"
import "./TrailRiderCard.css";

const TrailRiderCard = props => {

  const [friendRequest, setFriendRequest] = useState({
    userId: props.activeUserId,
    friendId: props.rider.user.id,
    isRequestPending: false,
    isAccepted: false
  });

  const createFriendRequest = () => {
    const newFriendRequest = {...friendRequest}
    setFriendRequest(newFriendRequest.isRequestPending = true)
    console.log(newFriendRequest);
    FriendsManager.post(newFriendRequest);
  };

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
        <button onClick={createFriendRequest} className="addFriendBtn">
          Add Friend
        </button>
      </div>
    </>
  );
};

export default TrailRiderCard;
