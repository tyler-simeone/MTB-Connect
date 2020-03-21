import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendRequestCard from "./FriendRequestCard";
import "./PendingFriends.css";

const PendingFriends = props => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [updatedFriendRequest, setUpdatedFriendRequest] = useState({});

  // const [updatedFriendRequest, setUpdatedFriendRequest] = useState({});
  const activeUserId = props.activeUserId;

  // When pending requests page loads will get all requests for logged in user and update state with those requests.
  const viewFriendRequests = () => {
    FriendsManager.getAllRequests(props.activeUserId).then(requests => {
      setFriendRequests(requests);
    });
  };

  // Passing this to child card, which will run in .then() after acceptRequest runs from btn click, and will update parent state with
  // updated request objs state, then ternary on updatedFriendRequests here to display null : card depending on
  // updatedFriendRequests.map(request => request.isAccepted === true)

  const viewUpdatedFriendRequest = (requestId) => {
    FriendsManager.getRequest(requestId).then(request => {
      console.log(request)
      setUpdatedFriendRequest(request)})
    //  .then(() => {
    //   console.log(updatedFriendRequest)
    // })
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

      {/* The goal here is for updatedFriendRequest to render nothing if the request is accepted (on btn click) */}
      {/* TODO: Problem here is i think it's looking for a value as soon as page loads from updatedFriendRequest state, bc it renders
      the cards when conditional says === undefined, until I click an 'Accept' button, then removes the list of cards bc state changed.. */}
      {updatedFriendRequest.isAccepted === undefined ? (
        <div className="pendingFriendsBox">
          {friendRequests.map(request => {
            return (
              <FriendRequestCard
                key={request.id}
                activeUserId={activeUserId}
                request={request}
                updatedRequests={viewUpdatedFriendRequest}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default PendingFriends;
