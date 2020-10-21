import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./NavBar.css";

import Typography from "@material-ui/core/Typography";
import CustomizedMenu from "./CustomizedMenu.js";
import Avatar from '@material-ui/core/Avatar';

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="headerBannerOne">
        {hasUser ? (
        <>
          <CustomizedMenu hasUser={hasUser} clearUser={clearUser} className="burgerBtn" />

          {props.avatarImg ? (
            <Avatar onClick={() => props.history.push('/profile')} src={props.avatarImg} aria-label="profile-avatar" className="avatar">
            </Avatar>
          ) : (
            <Avatar onClick={() => props.history.push('/profile')} aria-label="profile-avatar" className="avatar">
              {props.avatarLogo}
            </Avatar>
          )}
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
