import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendRequestCard from "./FriendRequestCard";
import "./PendingFriends.css";

// NOTE: Pending Friends returns a list of friend request cards and when 'Accept' is clicked on the card, will re-set the state w/
// updated request obj from DB which will cause a re-render and then the if() on line 36 will update!
const PendingFriends = props => {
  const [friendRequests, setFriendRequests] = useState([]);

  const activeUserId = props.activeUserId;

  const viewFriendRequests = () => {
    FriendsManager.getAllRequests(activeUserId).then(requests => {
      setFriendRequests(requests);
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
          if (request.isAccepted === false) {
            return (
              <FriendRequestCard
                key={request.id}
                activeUserId={activeUserId}
                request={request}
                viewFriendRequests={viewFriendRequests}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default PendingFriends;
