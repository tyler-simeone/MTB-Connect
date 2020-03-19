const baseURL = "http://localhost:5002"

export default {
    getUsersWithTrails(trailId) {
        return fetch(`${baseURL}/trailUsers?_expand=user&trailId=${trailId}`).then(resp => resp.json())
    }
}