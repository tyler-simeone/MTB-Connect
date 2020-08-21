const baseURL = "http://127.0.0.1:8000";

export default {
  getAll() {
    return fetch(`${baseURL}/users`).then(resp => resp.json());
  },
  post(newUser) {
    return fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(resp => resp.json());
  }
};
