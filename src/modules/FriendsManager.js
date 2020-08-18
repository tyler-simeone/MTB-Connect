const baseURL = "http://127.0.0.1:8000";

export default {
  // Active user viewing friend requests
  getAllRequests(activeUserId) {
    return fetch(
      `${baseURL}/friends?receiverId=${activeUserId}`
    ).then(resp => resp.json());
  },
  // Active user viewing friends 
  // NOTE: This fetch is getting me both users who have SENT me a friend req that I've accepted, AND users who I'VE sent
  // a request to that have accepted. Will also now be able to get friends for both the sender and the receiver based on whose logged in.
  getAllFriends(activeUserId) {
    return fetch(
      `${baseURL}/friends?receiverId=${activeUserId}&isAccepted=true`
    ).then(resp => resp.json())
    .then(receiverFriends => {
        return fetch(
          `${baseURL}/friends?senderId=${activeUserId}&isAccepted=true`
        ).then(resp => resp.json())
        .then(senderFriends => {
          return receiverFriends.concat(senderFriends)
        })
    })
  },
  // Active user viewing their friend's data via accessing the friend's 'user' obj from id
  getFriendUserInfo(id) {
    return fetch(
      `${baseURL}/users/${id}`
    ).then(resp => resp.json());
  },
  // Runs when user accepts friend request, and req moves from 'pending' to 'friends' page
  updateRequest(updatedRequest, requestId) {
    return fetch(`${baseURL}/friends/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRequest)
    }).then(resp => resp.json());
  },
  // Runs when user adds another user as a friend (creates new friend obj in DB "friends" table)
  post(newFriendRequest) {
    return fetch(`${baseURL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFriendRequest)
    }).then(resp => resp.json());
  },
  // NOTE: so deleteFriend should be fixed as I renamed FKs to prevent JSON cascade delete (should only be deleting the targeted friend
  // object now), also had to refactor new objs a bit for post and update (adding/accepting friend).
  deleteFriend(id) {
    return fetch(`${baseURL}/friends/${id}`, {
      method: "DELETE"
    })
  }
};
