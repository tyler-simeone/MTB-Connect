import React, { useState } from "react";
import TrailsManager from "../../modules/TrailsManager";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';



const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    padding: '10px 30px',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    marginTop: '60px',
    border: '3px solid #2b94d1',
    borderRadius: '8px',
    ['@media (max-width:600px)']: {
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      padding: '10px 30px',
      marginTop: '40px',
      border: '2px solid #2b94d1',
      borderRadius: '8px'
    },
    ['@media (min-width:1200px)']: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      padding: '30px 70px',
      marginTop: '60px',
      border: '3px solid #2b94d1',
      borderRadius: '8px',
      fontSize: '25px'
    }
  },
  textfield: {
    marginTop: '7px',
    '& .MuiInput-underline::after': {
      borderBottomColor: '#2b94d1',
    },
    '& .MuiInputBase-input': {
      height: '1.5em'
    }
  },
  selectLabel: {
    marginTop: '14px',
  },
  select: {
    '&:after': {
      borderBottomColor: '#2b94d1',
    }
  },
  button: {
    marginTop: '5px',
    ['@media (min-width:1200px)']: {
      marginTop: '15px',
    }
  }
}));

const CreateTrail = props => {
  const classes = useStyles();

  const [trail, setTrail] = useState({
    trail_name: "",
    trail_img: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    creator_id: props.activeUserId
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleFieldChange = evt => {
    const stateToChange = { ...trail };
    stateToChange[evt.target.id] = evt.target.value;
    setTrail(stateToChange);
  };

  const addNewTrail = evt => {
    evt.preventDefault();

    setIsLoading(true)

    // TODO: add new input fields to populate below fields
    const updatedAddress = [trail.address, trail.city, trail.state]
    const joinedAddress = updatedAddress.join(', ')
    console.log(joinedAddress)

    const newTrail = {
      trail_name: trail.trail_name,
      trail_img: trail.trail_img,
      description: trail.description,
      address: joinedAddress,
      zipcode: trail.zipcode,
      creator_id: props.activeUserId
    }
    
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
          placeholder="Street Address"
          className={classes.textfield}
        ></TextField>
        <TextField
          id="city"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder="City"
          className={classes.textfield}
        ></TextField>
        <InputLabel className={classes.selectLabel} id="city-label">State</InputLabel>
        <NativeSelect
          className={classes.select}
          onChange={handleFieldChange}
          id="state"
        >
          <option aria-label="None" value="" />
          <option value={"AL"}>Alabama</option>
          <option value={"AK"}>Alaska</option>
          <option value={"AZ"}>Arizona</option>
          <option value={"AR"}>Arkansas</option>
          <option value={"CA"}>California</option>
          <option value={"CO"}>Colorado</option>
          <option value={"CT"}>Connecticut</option>
          <option value={"DE"}>Delaware</option>
          <option value={"DC"}>District Of Columbia</option>
          <option value={"FL"}>Florida</option>
          <option value={"GA"}>Georgia</option>
          <option value={"HI"}>Hawaii</option>
          <option value={"ID"}>Idaho</option>
          <option value={"IL"}>Illinois</option>
          <option value={"IN"}>Indiana</option>
          <option value={"IA"}>Iowa</option>
          <option value={"KS"}>Kansas</option>
          <option value={"KY"}>Kentucky</option>
          <option value={"LA"}>Louisiana</option>
          <option value={"ME"}>Maine</option>
          <option value={"MD"}>Maryland</option>
          <option value={"MA"}>Massachusetts</option>
          <option value={"MI"}>Michigan</option>
          <option value={"MN"}>Minnesota</option>
          <option value={"MS"}>Mississippi</option>
          <option value={"MO"}>Missouri</option>
          <option value={"MT"}>Montana</option>
          <option value={"NE"}>Nebraska</option>
          <option value={"NV"}>Nevada</option>
          <option value={"NH"}>New Hampshire</option>
          <option value={"NJ"}>New Jersey</option>
          <option value={"NM"}>New Mexico</option>
          <option value={"NY"}>New York</option>
          <option value={"NC"}>North Carolina</option>
          <option value={"ND"}>North Dakota</option>
          <option value={"OH"}>Ohio</option>
          <option value={"OK"}>Oklahoma</option>
          <option value={"OR"}>Oregon</option>
          <option value={"PA"}>Pennsylvania</option>
          <option value={"RI"}>Rhode Island</option>
          <option value={"SC"}>South Carolina</option>
          <option value={"SD"}>South Dakota</option>
          <option value={"TN"}>Tennessee</option>
          <option value={"TX"}>Texas</option>
          <option value={"UT"}>Utah</option>
          <option value={"VT"}>Vermont</option>
          <option value={"VA"}>Virginia</option>
          <option value={"WA"}>Washington</option>
          <option value={"WV"}>West Virginia</option>
          <option value={"WI"}>Wisconsin</option>
          <option value={"WY"}>Wyoming</option>
        </NativeSelect>
        <TextField
          id="zipcode"
          type="text"
          required
          onChange={handleFieldChange}
          size="small"
          placeholder="Zipcode"
          className={classes.textfield}
        ></TextField>
        <Button 
          className={classes.button} 
          type="submit" 
          disabled={isLoading}
        >Add Trail</Button>
      </form>
    </>
  );
};

export default CreateTrail;
