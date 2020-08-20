import React, { useState, useEffect } from "react";
import "./Friends.css";
import FriendCard from "./FriendCard";
import FriendsManager from "../../modules/FriendsManager";

const Friends = props => {
  const activeUser = props.activeUserId;

  const [friends, setFriends] = useState([]);

  // NOTE: The reason I can see the opposite user's data when viewing friends list is because of the renderFriend() fn that Kristen helped me
  // write in the FriendCard.js , BUT that was based on correct data coming in from DB, which is what Bryan helped me with this morning.
  // Prior to this morning I was missing half of the data (the people that have sent friend requests couldn't see their new friends that
  // accepted those requests) and only the receivers could see the opposite user's data.

  // NOTE: This updated fetch now allows me to get all friends (in a concatenated array) who I've accepted requests from,
  // AND who have accepted requests from me. And will also allow the renderFriend() fn that Kristen helped me with to work correctly.
  const getAllFriends = () => {
    FriendsManager.getAllFriends(activeUser).then(friends => {
      setFriends(friends);
      console.log(friends)
    });
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  return (
    <>
      <div className="friendsListBox">
        {friends.map(friend => {
          return (
            <FriendCard
              key={friend.id}
              activeUser={activeUser}
              friend={friend}
              getAllFriends={getAllFriends}
            />
          );
        })}
      </div>
    </>
  );
};

export default Friends;
