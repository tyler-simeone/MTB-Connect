import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendRequestCard from "./FriendRequestCard"
import "./PendingFriends.css";

const PendingFriends = props => {
  const [friendRequests, setFriendRequests] = useState([]);

  const viewFriendRequests = () => {
    FriendsManager.getAllRequests(props.activeUserId).then(requests => {
      console.log(requests);
      setFriendRequests(requests)
    });
  };

  useEffect(() => {
    viewFriendRequests();
  }, []);

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

      <div className="pendingFriendsBox">
        {friendRequests.map(request => {
          return <FriendRequestCard key={request.id} request={request} />
        })}
      </div>
    </>
  );
};

export default PendingFriends;
