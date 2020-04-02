import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./NavBar.css";
import Typography from "@material-ui/core/Typography";

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="headerBannerOne">
        <div className="navContainer">
          <nav>
            <Menu disableAutoFocus>
              <ul>
                <li>
                  <Link className="menu-item" to="/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="menu-item" to="/trails">
                    Trails
                  </Link>
                </li>
                <li>
                  <Link className="menu-item" to="/friends">
                    Friends
                  </Link>
                </li>
                <li>
                  <Link className="menu-item" to="/pending">
                    Pending Requests
                  </Link>
                </li>
                {hasUser ? (
                  <li>
                    <Link
                      onClick={clearUser}
                      className="menu-item"
                      to="/welcome"
                    >
                      Logout
                    </Link>
                  </li>
                ) : null}
              </ul>
            </Menu>
          </nav>
        </div>
      </div>
      <div className="headerBannerTwo">
        {/* Insert React Burger here */}
        <Typography component="h1" variant="h2">MTB Connect</Typography>
        {/* <h1 className="text-size--large">MTB Connect</h1> */}
        {/* Insert avatar/link here */}
      </div>
    </header>
  );
};

export default withRouter(NavBar);
