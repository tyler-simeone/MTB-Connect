const baseURL = "http://3.18.215.253:8080";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export default {
    getAll() {
        return fetch(`${proxyurl}/${baseURL}/users`).then(resp => resp.json())
    },
    post(credentials) {
        return fetch(`${proxyurl}/${baseURL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        }).then(resp => resp.json());
      }
}