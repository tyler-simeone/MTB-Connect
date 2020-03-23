import React from "react";
import FriendsManager from "../../modules/FriendsManager";

const TrailRiderCard = props => {

  // NOTE: acceptFriendRequest() will update 'isAccepted' friend request property from 'false' to 'true', and then will re-fetch the 
  // updated data obj and console.log it.
  const acceptFriendRequest = () => {
    const updatedRequest = {
      userId: props.request.userId,
      friendId: props.request.friendId,
      isRequestPending: props.request.isRequestPending,
      isAccepted: true
    };
    // requestId is how the fetch PUT knows which object to update
    const requestId = props.request.id;

    FriendsManager.updateRequest(updatedRequest, requestId).then(() => {
      props.viewFriendRequests()
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
        <button onClick={acceptFriendRequest} className="acceptFriendBtn">
          Accept
        </button>
      </div>
    </>
  );
};

export default TrailRiderCard;
