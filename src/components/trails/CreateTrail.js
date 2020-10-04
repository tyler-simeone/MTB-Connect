import React, { useState } from "react";
import TrailsManager from "../../modules/TrailsManager";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
    marginTop: '60px',
    border: '3px solid #2c77b8',
    borderRadius: '2px',
    ['@media (max-width:600px)']: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '80%',
      marginTop: '60px',
      border: '2px solid #2c77b8',
      borderRadius: '2px'
    }
  },
  textfield: {
    marginTop: '7px'
  }
}));

const CreateTrail = props => {
  const classes = useStyles();

  const [newTrail, setNewTrail] = useState({
    trail_name: "",
    trail_img: "",
    description: "",
    address: "",
    zipcode: "",
    creator_id: props.activeUserId
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
      <form onSubmit={addNewTrail} className={classes.root}>
        <TextField
          id="trail_name"
          type="text"
          required
          onChange={handleFieldChange}
          size="small"
          placeholder="Name"
          className={classes.textfield}
        ></TextField>
        <TextField
          id="trail_img"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder="Image Link (optional)"
          className={classes.textfield}
        ></TextField>
        <TextField
          id="description"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder="Description"
          className={classes.textfield}
        ></TextField>
        <TextField
          id="address"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder="Address"
          className={classes.textfield}
        ></TextField>
        <TextField
          id="zipcode"
          type="text"
          required
          onChange={handleFieldChange}
          size="small"
          placeholder="Zipcode"
          className={classes.textfield}
        ></TextField>
        <Button type="submit" disabled={isLoading} className="submitBtn">Add Trail</Button>
      </form>
    </>
  );
};

export default CreateTrail;
