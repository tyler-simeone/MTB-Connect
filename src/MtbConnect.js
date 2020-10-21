import React, { useState, useEffect } from "react";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import "./MtbConnect.css";
import LoginManager from "./modules/LoginManager"


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

  const [avatarLogo, setAvatarLogo] = useState();
  const [avatarImg, setAvatarImg] = useState();
  const [userInfo, setUserInfo] = useState();
  
  // Below two fns are to get user's initials for avatar logo
  const getUserInitials = (user) => {
    
      const firstName = user.user.first_name
      const firstNameArr = firstName.split('')
      const firstNameInitial = firstNameArr[0]

      const lastName = user.user.last_name
      const lastNameArr = lastName.split('')
      const lastNameInitial = lastNameArr[0]

      const avatarInitials = firstNameInitial + lastNameInitial

      setAvatarLogo(avatarInitials)
      setAvatarImg(user.avatar_img)
  }

  const getActiveUser = () => {
    LoginManager.getAll().then(users => {
      const activeUserId = sessionStorage.getItem("Active User Id")
      var user;
      for (user of users) {
        if (user.id === parseInt(activeUserId)) {
          console.log(user)
          getUserInitials(user);
          setUserInfo(user)
        }
      }
    })
  }

  // This is what's causing the avatar logo to re-render
  useEffect(() => {
    getActiveUser();
  }, [hasUser]);

  return (
    <>
      <NavBar hasUser={hasUser} clearUser={clearUser} avatarImg={avatarImg} avatarLogo={avatarLogo} />
      <ApplicationViews hasUser={hasUser} setUser={setUser} userInfo={userInfo} />
    </>
  );
};

export default MtbConnect;