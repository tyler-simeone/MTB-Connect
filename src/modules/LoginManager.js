const baseURL = "http://127.0.0.1:8000"

export default {
    getAll() {
        return fetch(`${baseURL}/users`).then(resp => resp.json())
    }
}