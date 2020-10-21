import React, { useEffect, useState } from "react";
import LoginManager from "../../modules/LoginManager";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
  },
  photoContainer: {
    marginTop: '60px',
    marginLeft: '20%',
    height: '250px',
    width: '250px',
  },
  photo: {
    width: '250px',
    height: '250px',
    borderRadius: '8px'
  },
  root: {
    margin: '0 auto',
    padding: '10px 30px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '60px',
    border: '3px solid #2b94d1',
    borderRadius: '8px',
    ['@media (max-width:768px)']: {
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      padding: '10px 30px',
      marginTop: '40px',
      border: '2px solid #2b94d1',
      borderRadius: '8px'
    },
    ['@media (min-width:768px)']: {
      width: '60%',
    },
    ['@media (min-width:1200px)']: {
      display: 'flex',
      flexDirection: 'column',
      width: '40%',
      padding: '30px 70px',
      marginTop: '60px',
      marginLeft: '30px',
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

const Profile = props => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false)

  const handleFieldChange = evt => {
    // const stateToChange = { ...trail };
    // stateToChange[evt.target.id] = evt.target.value;
    // setTrail(stateToChange);
  };

  useEffect(() => {
    console.log(props.userInfo)
  })

  return (
    <div className={classes.container}>
      <div className={classes.photoContainer}>
        {props.userInfo !== undefined ? (
          <img src={props.userInfo.avatar_img} className={classes.photo} />
        ) : null}
      </div>
      <form className={classes.root}>
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
        >Update</Button>
      </form>
    </div>
  );
};

export default Profile;
