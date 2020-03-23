const baseURL = "http://localhost:5002";

export default {
  getAllRequests(activeUserId) {
    return fetch(
      `${baseURL}/friends?receiverId=${activeUserId}`
    ).then(resp => resp.json());
  },
  getAllFriends(activeUserId) {
    return fetch(
      `${baseURL}/friends?receiverId=${activeUserId}&isAccepted=true`
    ).then(resp => resp.json());
  },
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
  // NOTE: so deleteFriend should be fixed as I renamed FKs to prevent JSON cascading, but now need to refactor so diff users can view 
  // eachother as friends (2 new 'get' requests), and had to refactor new objs a bit for post and edit (adding/accepting friend)
  deleteFriend(id) {
    return fetch(`${baseURL}/friends/${id}`, {
      method: "DELETE"
    })
  }
};
