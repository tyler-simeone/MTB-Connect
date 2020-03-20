const baseURL = "http://localhost:5002";

export default {
  //   get(trailId) {
  //     return fetch(`${baseURL}/trails/${trailId}`).then(resp => resp.json());
  //   },
  getAllRequests(activeUserId) {
    return fetch(
      `${baseURL}/friends?_expand=user&friendId=${activeUserId}`
    ).then(resp => resp.json());
  },
  //   // This qs parameter is saying find and return any whose 'key = {value}'
  //   getSomeTrails(zipcode) {
  //     return fetch(`${baseURL}/trails?zipcode=${zipcode}`).then(resp => resp.json());
  //   },
  post(newFriendRequest) {
    return fetch(`${baseURL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFriendRequest)
    }).then(resp => resp.json());
  }
};
