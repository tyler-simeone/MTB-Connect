import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./NavBar.css";
import LoginManager from "../../modules/LoginManager"

import Typography from "@material-ui/core/Typography";
import CustomizedMenu from "./CustomizedMenu.js";
import Avatar from '@material-ui/core/Avatar';


const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  const [avatarLogo, setAvatarLogo] = useState();
  
  // Below two fns are to get user's initials for avatar logo
  const getUserInitials = (user) => {
    
      const firstName = user.user.first_name
      const firstNameArr = firstName.split('')
      const firstNameInitial = firstNameArr[0]

      const lastName = user.user.last_name
      const lastNameArr = lastName.split('')
      const lastNameInitial = lastNameArr[0]

      const avatarInitials = firstNameInitial + lastNameInitial
      console.log(avatarInitials)
      setAvatarLogo(avatarInitials)
  }

  const getActiveUser = () => {
    LoginManager.getAll().then(users => {
      const userId = sessionStorage.getItem("Active User Id")
      var user;
      for (user of users) {
        if (user.id === parseInt(userId)) {
          getUserInitials(user);
        }
      }
    })
  }

  useEffect(() => {
    getActiveUser();
  }, [hasUser]);

  return (
    <header className="header">
      <div className="headerBannerOne">
        {hasUser ? (
        <>
          <CustomizedMenu hasUser={hasUser} clearUser={clearUser} className="burgerBtn" />
          <Avatar aria-label="profile-avatar" className="avatar">
              {avatarLogo}
          </Avatar>
        </>
        ) : null}
      </div>
      <div className="headerBannerTwo">
        <Typography component="h1" variant="h2">
          MTB Connect
        </Typography>
      </div>
    </header>
  );
};

export default withRouter(NavBar);
