import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import UsersManager from "../../modules/UsersManager";
import "./TrailRiderCard.css";

const TrailRiderCard = props => {
  const [alreadyFriends, setAlreadyFriends] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [friendRequest, setFriendRequest] = useState({
    senderId: props.activeUserId,
    receiverId: props.rider.user.id,
    isRequestPending: false,
    isAccepted: false
  });

  const createFriendRequest = () => {
    const newFriendRequest = { ...friendRequest };
    setFriendRequest((newFriendRequest.isRequestPending = true));
    setIsLoading(true);
    FriendsManager.post(newFriendRequest);
  };

  const removeFromRidersList = () => {
    UsersManager.deleteUserWithTrail(props.rider.id).then(() => {
      props.findTrailUsers();
    });
  };

  // Getting all friends from DB, going through each friend and seeing if one friend has a receiverId that matches the active user & a
  // senderId that matches the TrailRiderCard we're viewing, OR vice-versa. If one friend in the DB meets the condition then we will
  // update state and hide the 'Add Friend' button for this card because that means they're already friends.

  // These conditionals are to hide the 'Add Friend' button on the card if the card is either the active user or their friend (via friend req sent to them or they sent req to active user).
  const getAllFriends = () => {
    // TODO: See what this logs....
    console.log(props.rider.user.avatarImg);
    FriendsManager.getAllFriends(props.activeUserId).then(friends => {
      const friend = friends.find(friend => {
        if (
          (friend.receiverId === props.activeUserId &&
            friend.senderId === props.rider.user.id) ||
          props.rider.user.id === props.activeUserId
        ) {
          return true;
        } else if (
          (friend.senderId === props.activeUserId &&
            friend.receiverId === props.rider.user.id) ||
          props.rider.user.id === props.activeUserId
        ) {
          return true;
        }
      });
      setAlreadyFriends(friend);
    });
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  return (
    <>
      <div className="trailRiderCardContainer">
        <div className="riderImageContainer">
          <img
            src={`${props.rider.user.avatarImg}`}
            width="100"
            height="100"
            alt="Trail Rider Image"
          />
        </div>

        <div className="stackContent">
          <section className="trailRiderCard">
            <h2>{props.rider.user.fullName}</h2>
            <p>{props.rider.user.username}</p>
          </section>
          {/* Insert 'Add Friend' Icon here as Link component when ready */}
          {props.rider.user.id !== props.activeUserId &&
          alreadyFriends === undefined ? (
            <button
              onClick={createFriendRequest}
              className="trailRiderCardBtn"
              disabled={isLoading}
            >
              Add Friend
            </button>
          ) : null}
          {props.rider.user.id === props.activeUserId ? (
            <button
              onClick={removeFromRidersList}
              className="trailRiderCardBtn"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TrailRiderCard;
