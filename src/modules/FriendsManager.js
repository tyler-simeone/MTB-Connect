const baseURL = "http://localhost:5002";

export default {
  // active user viewing friend requests
  getAllRequests(activeUserId) {
    return fetch(
      `${baseURL}/friends?receiverId=${activeUserId}`
    ).then(resp => resp.json());
  },
  // active user viewing friends 
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
  // NOTE: Trying to get these 2 methods to work but they're ran on parent components so not sure how to get them to know when user is
  // sender vs receiver
  // getAllSendersFriends(activeUserId) {
  //   return fetch(
  //     `${baseURL}/friends?senderId=${activeUserId}&isAccepted=true`
  //   ).then(resp => resp.json());
  // },
  // getAllReceiversFriends(activeUserId) {
  //   return fetch(
  //     `${baseURL}/friends?receiverId=${activeUserId}&isAccepted=true`
  //   ).then(resp => resp.json());
  // },
  // active user viewing friend data via accessing the friend's user obj from id
  getFriendUserInfo(id) {
    return fetch(
      `${baseURL}/users/${id}`
    ).then(resp => resp.json());
  },
  updateRequest(updatedRequest, requestId) {
    return fetch(`${baseURL}/friends/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRequest)
    }).then(resp => resp.json());
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
  // NOTE: so deleteFriend should be fixed as I renamed FKs to prevent JSON cascade delete, but now need to refactor so diff users can view 
  // eachother as friends (2 new 'get' requests), and had to refactor new objs a bit for post and edit (adding/accepting friend)
  deleteFriend(id) {
    return fetch(`${baseURL}/friends/${id}`, {
      method: "DELETE"
    })
  }
};
