const baseURL = "https://api.mtb-connect.com:8080";
// const baseURL = "http://127.0.0.1:8000";

export default {
    getAll() {
        return fetch(`${baseURL}/users`).then(resp => resp.json())
    },
    post(credentials) {
        return fetch(`${baseURL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        }).then(resp => resp.json());
      }
}