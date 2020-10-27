import React, { useEffect, useState } from "react";
import UsersManager from "../../modules/UsersManager";
import LoginManager from "../../modules/LoginManager"

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



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
    padding: '10px 20px 0px 20px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '60px',
    border: '3px solid #2b94d1',
    borderRadius: '8px',
    maxHeight: '250px',
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
      width: '30%',
    },
    ['@media (min-width:1200px)']: {
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      // padding: '30px 70px',
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
  firstName: {
    maxWidth: '100px',
    marginRight: '25px'
  },
  lastName: {
    maxWidth: '130px'
  },
  button: {
    marginTop: '5px',
    ['@media (min-width:1200px)']: {
      marginTop: '15px',
    }
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '12px'
  },
  arrowBackIcon: {
    marginTop: '12px',
    marginRight: '12px',
    '&:hover': {
      cursor: 'Pointer'
    }
  },
  editBtn: {
    '&:hover': {
      cursor: 'Pointer'
    }
  },
  userInfoSection: {
    fontSize: '18px',
    padding: '5px 0 7px',
    marginBottom: '10px',
    borderBottom: '1px solid gray',
    
  },
  avatarURL: {
    fontSize: '16px',
    fontStyle: 'italic',
    color: 'gray'
  }
}));

const Profile = props => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [userInfo, setUserInfo] = useState()
  const [updatedUser, setUpdatedUser] = useState(
    {
        "first_name": props.userInfo.user.first_name,
        "last_name": props.userInfo.user.last_name,
        "username": props.userInfo.user.username,
        "email": props.userInfo.user.email,
        "avatar_img": props.userInfo.avatar_img,
    })

  const handleFieldChange = evt => {
    const stateToChange = { ...updatedUser };
    stateToChange[evt.target.id] = evt.target.value;
    setUpdatedUser(stateToChange);
  };

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const updateUserInfo = evt => {
    evt.preventDefault()
    console.log(updatedUser)
    UsersManager.updateUser(updatedUser, props.userInfo.user_id)
      .then(UsersManager.getUser(props.userInfo.id).then(response => setUserInfo(response)))
    setEditMode(!editMode)
  }

  useEffect(() => {
    console.log(props.userInfo)
    UsersManager.getUser(props.userInfo.id).then(response => setUserInfo(response))  
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.photoContainer}>
        {userInfo !== undefined ? (
          <img src={userInfo.avatar_img} className={classes.photo} />
        ) : null}
      </div>
      {userInfo !== undefined && !editMode ? (
      <form className={classes.root}>
        <section className={classes.userInfoSection}>
          {`${userInfo.user.first_name} ${userInfo.user.last_name}`}
        </section>
        <section className={classes.userInfoSection}>
          {userInfo.user.username}
        </section>
        <section className={classes.userInfoSection}>
          {userInfo.user.email}
        </section>
        <section className={`${classes.userInfoSection} ${classes.avatarURL}`}>
        Avatar Image URL
        </section>
        <div>
          <EditIcon className={classes.editBtn} onClick={handleEditMode} />
        </div>
      </form>
      ) : null}

      {userInfo !== undefined && editMode ? (
      <form onSubmit={updateUserInfo} className={classes.root}>
        <div className={classes.nameContainer}>
          <TextField
            id="first_name"
            type="text"
            onChange={handleFieldChange}
            size="small"
            placeholder={`${userInfo.user.first_name}`}
            className={`${classes.textfield} ${classes.firstName}`}
          ></TextField>
          <TextField
            id="last_name"
            type="text"
            onChange={handleFieldChange}
            size="small"
            placeholder={`${userInfo.user.last_name}`}
            className={`${classes.textfield} ${classes.lastName}`}
          ></TextField>
        </div>
        <TextField
          id="username"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder={userInfo.user.username}
          className={classes.textfield}
        ></TextField>
        <TextField
          id="email"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder={userInfo.user.email}
          className={classes.textfield}
        ></TextField>
        <TextField
          id="avatar_img"
          type="text"
          onChange={handleFieldChange}
          size="small"
          placeholder={userInfo.avatar_img}
          className={classes.textfield}
        ></TextField>
        <div className={classes.buttonContainer}>
          <ArrowBackIcon onClick={handleEditMode} className={classes.arrowBackIcon} />
          <Button 
            className={classes.button} 
            type="submit" 
            disabled={isLoading}
          >Update</Button>
        </div>
      </form>
      ) : null}
    </div>
  );
};

export default Profile;
