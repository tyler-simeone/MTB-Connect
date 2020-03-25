import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";

const TrailRiderCard = props => {
  const [user, setUser] = useState({});

  const acceptFriendRequest = () => {
    const updatedRequest = {
      senderId: props.request.senderId,
      receiverId: props.request.receiverId,
      isRequestPending: props.request.isRequestPending,
      isAccepted: true
    };
    // requestId is how the fetch PUT knows which 'friend' object to update
    const requestId = props.request.id;

    FriendsManager.updateRequest(updatedRequest, requestId).then(() => {
      props.viewFriendRequests();
    });
  };

  const renderFriend = () => {
    FriendsManager.getFriendUserInfo(props.request.senderId).then(friend => {
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
