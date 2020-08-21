const baseURL = "http://127.0.0.1:8000"

export default {
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