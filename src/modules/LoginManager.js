const baseURL = "http://localhost:5002"

export default {
    getAll() {
        return fetch(`${baseURL}/users`).then(resp => resp.json())
    }
}