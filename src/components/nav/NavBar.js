import React from "react";
import { withRouter, Link } from "react-router-dom";
// import "./NavBar.css"

const NavBar = props => {
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
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
