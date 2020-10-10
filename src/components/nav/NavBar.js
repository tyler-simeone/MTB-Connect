import React from "react";
import { withRouter } from "react-router-dom";
import "./NavBar.css";
import Typography from "@material-ui/core/Typography";
import CustomizedMenu from "./CustomizedMenu.js";

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="headerBannerOne">
        {hasUser ? (
        <>
          <CustomizedMenu hasUser={hasUser} clearUser={clearUser} className="burgerBtn" />
        </>
        ) : null}
      </div>
      <div className="headerBannerTwo">
        <Typography component="h1" variant="h2">
          MTB Connect
        </Typography>
        {/* Insert avatar/link here */}
      </div>
    </header>
  );
};

export default withRouter(NavBar);
