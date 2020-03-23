import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendRequestCard from "./FriendRequestCard";
import "./PendingFriends.css";

const PendingFriends = props => {
  const [friendRequests, setFriendRequests] = useState([]);

  const activeUserId = props.activeUserId;

  const viewFriendRequests = () => {
    FriendsManager.getAllRequests(props.activeUserId).then(requests => {
      setFriendRequests(requests);
    });
  };

  useEffect(() => {
    viewFriendRequests();
  }, []);

  // NOTE: All I had to do was call that function that runs on page load to getAll again AFTER I clicked accept, which re-getsAll &
  // re-sets state, and then my simple if() will either render or it won't. BOOM
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
