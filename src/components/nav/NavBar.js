import React from "react";
import { withRouter } from "react-router-dom";
import "./NavBar.css";
import Typography from "@material-ui/core/Typography";
import CustomizedMenu from "./CustomizedMenu.js";
import Button from "@material-ui/core/Button";

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="headerBannerOne">
        <CustomizedMenu className="burgerBtn" />
        <div className="logoutBtn">
        {hasUser ? (
          <Button onClick={clearUser} className="logoutBtn" href="/">
            Logout
          </Button>
        ) : null}
      </div>
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
