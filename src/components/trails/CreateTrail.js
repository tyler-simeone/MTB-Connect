import React, { useState } from "react";
import "./CreateTrail.css";
import TrailsManager from "../../modules/TrailsManager";

const CreateTrail = props => {
  const [newTrail, setNewTrail] = useState({
    name: "",
    img: "",
    description: "",
    zipcode: "",
    creatorId: props.activeUserId
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleFieldChange = evt => {
    const stateToChange = { ...newTrail };
    stateToChange[evt.target.id] = evt.target.value;
    setNewTrail(stateToChange);
  };

  const addNewTrail = evt => {
    evt.preventDefault();
    setIsLoading(true)
    // will create new trail and then return user to trails page (where they will then have to search for that trail)
    TrailsManager.post(newTrail).then(() => {
      props.history.push("/trails")
    });
  };

  return (
    <>
      <header className="header">
        <div className="header-banner-one"></div>
        <div className="header-banner-two">
          {/* Insert React Burger here */}
          <h1 className="text-size--large">MTB Connect</h1>
          {/* Insert avatar/link here */}
        </div>
      </header>

      <form onSubmit={addNewTrail} className="createTrailForm">
        <input
          id="name"
          type="text"
          required
          onChange={handleFieldChange}
          placeholder="Trail Name"
        ></input>
        <input
          id="img"
          type="text"
          onChange={handleFieldChange}
          placeholder="Trail Image"
        ></input>
        <input
          id="description"
          type="text"
          required
          onChange={handleFieldChange}
          placeholder="Trail Description"
        ></input>
        <input
          id="zipcode"
          type="text"
          required
          onChange={handleFieldChange}
          placeholder="Trail Zipcode"
        ></input>
        <button type="submit" disabled={isLoading}>Add Trail</button>
      </form>
    </>
  );
};

export default CreateTrail;
