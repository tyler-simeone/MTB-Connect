import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendRequestCard from "./FriendRequestCard";
import "./PendingFriends.css";

const PendingFriends = props => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [updatedFriendRequests, setUpdatedFriendRequests] = useState([]);
  const activeUserId = props.activeUserId;

  // When pending requests page loads will get all requests for logged in user and update state with those requests.
  const viewFriendRequests = () => {
    FriendsManager.getAllRequests(activeUserId).then(requests => {
      setFriendRequests(requests);
    });
  };
  
  // Passing this to child card, which will run in .then() after acceptRequest runs from btn click, and will update parent state with 
  // updated request objs state, then ternary on updatedFriendRequests here to display null : card depending on 
  // updatedFriendRequests.map(request => request.isAccepted === true)
  const viewUpdatedFriendRequests = () => {
    FriendsManager.getAllRequests(props.activeUserId).then(requests => {
      setUpdatedFriendRequests(requests)
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
          return <FriendRequestCard key={request.id} activeUserId={activeUserId} request={request} updatedRequests={viewUpdatedFriendRequests} />
        })}
      </div>
    </>
  );
};

export default PendingFriends;
