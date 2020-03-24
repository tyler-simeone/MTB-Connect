import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";

const FriendCard = props => {
  // used to hold user obj from DB to display user info on page (when we get the user by its id via friend obj FK's)
  const [user, setUser] = useState({});

// TODO: It's deleting from DB but not updating user state to trigger ternary to remove card from page. 
// TODO: (with the renderFriend() it is removing from page after hard refresh but not realtime...)
  const deleteFriend = friendId => {
    FriendsManager.deleteFriend(friendId).then(() => {
        props.getAllFriends()
        // FriendsManager.getFriend(friendId).then(friend => setUser(friend))
    });
  };

  // if you're the receiving user of the friend req. you will see data (via user state) for the sender, and vice-versa if logged-in as request sender
  const renderFriend = () => {
    if (props.friend.receiverId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.senderId).then(friend => {
        console.log(friend);
        setUser(friend);
      });
    } else if (props.friend.senderId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.receiverId).then(friend => {
        console.log(friend);
        setUser(friend);
      });
    }
  };

  useEffect(() => {
    renderFriend();
  }, []);

  //   NOTE: so the big issue here is something called cascading JSON delete (where deleting an obj with FK will delete obj that FK is
  // referencing too, assuming won't need that data anymore either)...

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
