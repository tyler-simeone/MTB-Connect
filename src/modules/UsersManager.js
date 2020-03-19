const baseURL = "http://localhost:5002";

export default {
  getUsersWithTrails(trailId) {
    return fetch(
      `${baseURL}/trailUsers?_expand=user&trailId=${trailId}`
    ).then(resp => resp.json());
  },
  addUserWithTrail(newUser) {
    return fetch(`${baseURL}/trailUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(resp => resp.json());
  }
};
