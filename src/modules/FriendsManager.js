const baseURL = "https://api.mtb-connect.com:8080";

export default {
  // Active user viewing friend requests
  getAllRequests(activeUserId) {
    return fetch(
      `${baseURL}/friends?receiverId=${activeUserId}`
    ).then(resp => resp.json());
  },
  // Active user viewing friends 
  // NOTE: This fetch is getting me both users who have SENT me a friend req that I've accepted, AND users who I'VE sent
  // a request to that have accepted.
  getAllFriends(activeUserId) {
    return fetch(
      `${baseURL}/friends?receiverId=${activeUserId}&isAccepted=True`
    ).then(resp => resp.json())
    .then(receiverFriends => {
        return fetch(
          `${baseURL}/friends?senderId=${activeUserId}&isAccepted=True`
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
    })
  },
  post(newFriendRequest) {
    return fetch(`${baseURL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFriendRequest)
    }).then(resp => resp.json());
  },
  deleteFriend(id) {
    return fetch(`${baseURL}/friends/${id}`, {
      method: "DELETE"
    })
  }
};
