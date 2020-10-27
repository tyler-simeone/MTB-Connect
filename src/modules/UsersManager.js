// const baseURL = "https://api.mtb-connect.com:8080";
const baseURL = "http://127.0.0.1:8000";

export default {
  getUsersWithTrails(trailId) {
    return fetch(
      `${baseURL}/trailusers?trailId=${trailId}`
    ).then(resp => resp.json());
  },
  addUserWithTrail(newUser) {
    return fetch(`${baseURL}/trailusers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(resp => resp.json());
  },
  deleteUserWithTrail(id) {
    return fetch(`${baseURL}/trailusers/${id}`, {
      method: "DELETE"
    });
  },
  updateUser(updatedUser, userId) {
    return fetch(`${baseURL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
  }
};
