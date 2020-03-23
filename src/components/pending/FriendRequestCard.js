import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";

const TrailRiderCard = props => {
  const [user, setUser] = useState({});

  // NOTE: acceptFriendRequest() will update 'isAccepted' friend request property from 'false' to 'true', and then will re-fetch the
  // updated data obj and console.log it.
  const acceptFriendRequest = () => {
    const updatedRequest = {
      senderId: props.request.senderId,
      receiverId: props.request.receiverId,
      isRequestPending: props.request.isRequestPending,
      isAccepted: true
    };
    // requestId is how the fetch PUT knows which object to update
    const requestId = props.request.id;

    FriendsManager.updateRequest(updatedRequest, requestId).then(() => {
      props.viewFriendRequests();
    });
  };

  // This fn will render the data being display in the friend card respective of which user is logged in, the sender OR the receiver.
  const renderFriend = () => {
    FriendsManager.getFriendUserInfo(props.request.senderId).then(friend => {
      console.log(friend);
      setUser(friend);
    });
  };

  useEffect(() => {
    renderFriend();
  }, []);

  return (
    <>
      <div className="friendRequestCardContainer">
        <figure className="riderImageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>
        <section className="trailRiderCard">
          <h2>{user.fullName}</h2>
          <p>{user.username}</p>
        </section>
        <button onClick={acceptFriendRequest} className="acceptFriendBtn">
          Accept
        </button>
      </div>
    </>
  );
};

export default TrailRiderCard;
