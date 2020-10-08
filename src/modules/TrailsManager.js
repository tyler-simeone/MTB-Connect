const baseURL = "https://3.18.215.253:8080";

export default {
  get(trailId) {
    return fetch(`${baseURL}/trails/${trailId}`).then(resp => resp.json());
  },
  getSomeTrails(zipcode) {
    return fetch(`${baseURL}/trails?zipcode=${zipcode}`).then(resp =>
      resp.json()
    );
  },
  getAllTrails() {
    return fetch(`${baseURL}/trails`).then(resp =>
      resp.json()
    );
  },
  post(newTrailUser) {
    return fetch(`${baseURL}/trails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTrailUser)
    }).then(resp => resp.json());
  },
  update(newTrail, trailId) {
    return fetch(`${baseURL}/trails/${trailId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTrail)
    })
  },
  delete(trailId) {
    return fetch(`${baseURL}/trails/${trailId}`, {
      method: "DELETE"
    })
  }
};
