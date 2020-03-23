import React, { useState, useEffect } from "react";
import "./Friends.css";
import FriendCard from "./FriendCard"
import FriendsManager from "../../modules/FriendsManager";

const Friends = props => {
  const activeUser = props.activeUserId;
  const [friends, setFriends] = useState([]);

  const getAllFriends = () => {
    FriendsManager.getAllFriends(activeUser).then(friends => {
      console.log(friends)
      setFriends(friends);
    });
  };
  // NOTE: Will set friends arr state to all friends (both pending & )
  useEffect(() => {
    getAllFriends();
  }, [])

  return (
    <>
      <header className="header">
        <div className="header-banner-one"></div>
        <div className="header-banner-two">
          {/* Insert React Burger here */}
          <h1 className="text-size--large">MTB Connect</h1>
          {/* Insert avatar/link here */}
        </div>
      </header>

      <div className="friendsListBox">
        {friends.map(friend => {
          return (<FriendCard key={friend.id} activeUser={activeUser} friend={friend} />)
        })}
      </div>
    </>
  );
};

export default Friends;
