import React from "react";
import { withRouter, Link } from "react-router-dom";
// import { slide as Menu } from "react-burger-menu";
import "./NavBar.css";

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="header-banner-one"></div>
      <div className="header-banner-two">
        {/* Insert React Burger here */}
        <h1 className="text-size--large">MTB Connect</h1>
        {/* Insert avatar/link here */}
        <div className="navContainer">
          <nav>
            {/* <Menu> */}
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
                  <Link onClick={clearUser} className="nav-link" to="/welcome">
                    Logout
                  </Link>
                </li>
              ) : null}
            </ul>
            {/* </Menu> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default withRouter(NavBar);
