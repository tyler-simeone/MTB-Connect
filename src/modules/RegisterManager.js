const baseURL = "http://localhost:5002";

export default {
  getAll() {
    return fetch(`${baseURL}/users`).then(resp => resp.json());
  },
  post(newUser) {
    return fetch(`${baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(resp => resp.json());
  }
};
