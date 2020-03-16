import React from "react";
import { withRouter, Link } from "react-router-dom";
// import "./NavBar.css"

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/trails">
              Trails
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/friends">
              Friends
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/pending">
              Pending Requests
            </Link>
          </li>
          {props.hasUser ? (
            <li>
              <Link onClick={clearUser} className="nav-link" to="/welcome">
                Logout
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
