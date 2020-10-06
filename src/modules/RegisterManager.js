const baseURL = "http://3.18.215.253:8080";

export default {
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
