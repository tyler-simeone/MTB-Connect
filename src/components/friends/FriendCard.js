import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";

const FriendCard = props => {
  const [user, setUser] = useState({});

  const deleteFriend = friendId => {
    FriendsManager.deleteFriend(friendId).then(() => {
        props.getAllFriends()
    });
  };

  // NOTE: if you're the receiving user of the friend req. you will see data (via user state) for the sender, and vice-versa if logged-in as request sender
  const renderFriend = () => {
    if (props.friend.receiverId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.senderId).then(friend => {
        setUser(friend);
      });
    } else if (props.friend.senderId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.receiverId).then(friend => {
        setUser(friend);
      });
    }
  };

  useEffect(() => {
    renderFriend();
  }, []);

  return (
    <>
      {user.fullName != null ? (
        <div className="friendCardContainer">
          <figure className="riderImageContainer">
            {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
          </figure>
          <section className="trailRiderCard">
            <h2> {user.fullName}</h2>
            <p>{user.username}</p>
          </section>
          <button
            onClick={() => deleteFriend(props.friend.id)}
            className="deleteFriendButton"
            type="button"
          >
            Delete
          </button>
        </div>
      ) : null}
    </>
  );
};

export default FriendCard;
