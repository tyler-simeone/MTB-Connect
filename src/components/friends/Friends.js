import React, { useState, useEffect } from "react";
import "./Friends.css";
import FriendCard from "./FriendCard"
import FriendsManager from "../../modules/FriendsManager";

const Friends = props => {
  const activeUser = props.activeUserId;
  const [friends, setFriends] = useState([]);

  // NOTE: The reason I can see the opposite user's data when viewing friends list is because of the conditional that Kristen helped me
  // write in the FriendCard.js , BUT that was based on correct data coming in from DB, which is what Bryan helped me with this morning.
  // Prior to this morning I was missing half of the data (the people that have sent friend requests couldn't see their new friends that
  // accepted those requests) and only the receivers could see the opposite user's data. :)
  // NOTE: This updated fetch now allows me to get all friends (in a concatenated array) who I've accepted requests from, 
  // AND who have accepted requests from me. Before I could only see people that have added me, not also people who I've added.
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

{/* Added an 'isSender' attribute based on conditional in my friends map that checks if logged-in user is also the sender, so now in my
    friend card, if I'm logged in as the sender I will see the receiver's data, and vice versa if logged-in user is receiver. */}
      <div className="friendsListBox">
        {friends.map(friend => {
          if (activeUser == friend.senderId) {
            return (<FriendCard key={friend.id} activeUser={activeUser} friend={friend} isSender={true} />)
          } else {
            return (<FriendCard key={friend.id} activeUser={activeUser} friend={friend} isSender={false} />)
          }
        })}
      </div>
    </>
  );
};

export default Friends;
