import React, { useState } from "react";
import "./CreateTrail.css";
import TrailsManager from "../../modules/TrailsManager";

import { TextField } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly"
  }
}));

const CreateTrail = props => {
  const classes = useStyles();
  const theme = useTheme();

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
      <form onSubmit={addNewTrail} className="createTrailForm">
        <TextField
          id="name"
          type="text"
          required
          onChange={handleFieldChange}
          size="small"
          placeholder="Name"
        ></TextField>
        <TextField
          id="img"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder="Image"
        ></TextField>
        <TextField
          id="description"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder="Description"
        ></TextField>
        <TextField
          id="zipcode"
          type="text"
          required
          onChange={handleFieldChange}
          size="small"
          placeholder="Zipcode"
        ></TextField>
        <button type="submit" disabled={isLoading}>Add Trail</button>
      </form>
    </>
  );
};

export default CreateTrail;
