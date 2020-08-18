const baseURL = "http://127.0.0.1:8000";

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
  },
  deleteUserWithTrail(id) {
    return fetch(`${baseURL}/trailUsers/${id}`, {
      method: "DELETE"
    });
  }
};
