import React from "react";
import FriendsManager from "../../modules/FriendsManager";

const FriendCard = props => {
  const friendId = props.friend.id;

  const deleteFriend = () => {
    FriendsManager.deleteFriend(friendId);
  };

  return (
    <>
      <div className="friendCardContainer">
        <figure className="riderImageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>
        <section className="trailRiderCard">
          <h2>{props.friend.user.fullName}</h2>
          <p>{props.friend.user.username}</p>
        </section>
        <button
          onClick={deleteFriend}
          className="deleteFriendButton"
          type="button"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default FriendCard;
