import React, { useState } from "react";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import "./MtbConnect.css";

const MtbConnect = () => {

  const isAuthenticated = () => sessionStorage.getItem("Active User Id") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = (userId, token) => {
    sessionStorage.setItem("Active User Id", JSON.stringify(userId));
    sessionStorage.setItem("Token", JSON.stringify(token));
    setHasUser(isAuthenticated());
  }

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  }

  return (
    <>
      <NavBar hasUser={hasUser} clearUser={clearUser} />
      <ApplicationViews hasUser={hasUser} setUser={setUser} />
    </>
  );
};

export default MtbConnect;