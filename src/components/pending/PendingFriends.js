import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendRequestCard from "./FriendRequestCard";
import "./PendingFriends.css";


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
      <div className="pendingFriendsBox">
        {friendRequests.map(request => {
          if (request.requestAccepted === false) {
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
