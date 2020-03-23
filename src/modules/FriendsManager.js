const baseURL = "http://localhost:5002";

export default {
  getAllRequests(activeUserId) {
    return fetch(
      `${baseURL}/friends?_expand=user&friendId=${activeUserId}`
    ).then(resp => resp.json());
  },
  getAllFriends(activeUserId) {
    return fetch(
      `${baseURL}/friends?_expand=user&friendId=${activeUserId}&isAccepted=true`
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
  deleteFriend(id) {
    return fetch(`${baseURL}/friends?_id=${id}`, {
      method: "DELETE"
    });
  }
};
