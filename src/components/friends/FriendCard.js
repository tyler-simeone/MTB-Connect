import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import "./FriendCard.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "20px auto",
    maxWidth: "700px"
  },
  details: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    minWidth: 296,
    minHeight: 237
  },
  buttons: {
    marginTop: "15px",
    marginLeft: "-7px"
  }
}));

const FriendCard = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [user, setUser] = useState({});

  const deleteFriend = friendId => {
    if (window.confirm(`Are you sure you want to delete ${user.fullName} as a friend?`)) {
      FriendsManager.deleteFriend(friendId).then(() => {
        props.getAllFriends();
      });
    }
  };

  // NOTE: This is to see data for the person on the opposite end of
  // the request
  const renderFriend = () => {
    if (props.friend.receiver_id === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.sender_id).then(friend => {
        // console.log(friend)
        setUser(friend);
      });
    } else if (props.friend.sender_id === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.receiver_id).then(friend => {
        // console.log(friend)
        setUser(friend);
      });
    }
  };

  useEffect(() => {
    renderFriend();
  }, []);

  return (
    <>
    {/* This was a tricky one! Changed ternary to check if the 
    nested JSON object existed, then accessed the data from it. */}
    {/* Checking if the user state was not null wasn't enough to 
    access the nested data. */}
      {user.user ? (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={`${user.avatar_img}`}
            title={`${user.user.first_name}`}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {user.user.first_name + " " + user.user.last_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {user.user.username}
              </Typography>
              <div className={classes.buttons}>
                <Button onClick={() => deleteFriend(props.friend.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ) : null}
    </>
  );
};

export default FriendCard;
