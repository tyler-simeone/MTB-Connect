import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";

const FriendCard = props => {
  const [user, setUser] = useState({});

  const deleteFriend = friendId => {
    FriendsManager.deleteFriend(friendId);
  };

  // This fn will render the data being display in the friend card respective of which user is logged in, the sender OR the receiver.
  const renderFriend = () => {
    if (props.friend.receiverId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.senderId).then(friend => {
        console.log(friend)
        setUser(friend);
      });
    } else if (props.friend.senderId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.receiverId).then(friend => {
        console.log(friend)
        setUser(friend);
      });
    }
  };

  useEffect(() => {
    renderFriend();
  }, []);

  //   TODO: so the big issue here is something called cascading JSON something (which is why it was deleting both the data with the
  // id val matching, AND the data with the friendId val matching)...
  // And since I have a friends table and a friendId, I needed to change the friendId, but I also then wouldn't be able to expand userId
  // anymore for the data (and you still need the sender of the friend request to be able to see their new friends as well, so need to add
  // new conditional for that...)

  // NOTE: Create useEffect to see if props.friend.receiverId === props.activeUser -> getOneUser(senderId)
  // vice versa --> if props.friend.senderId === activeUserId -> getOneUser(receiverId)

  return (
    <>
      <div className="friendCardContainer">
        <figure className="riderImageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>
        <section className="trailRiderCard">
          <h2>{user.fullName}</h2>
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
    </>
  );
};

export default FriendCard;
