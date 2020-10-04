import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import "./FriendCard.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: "20px auto",
    maxWidth: "700px",
    ['@media (max-width:600px)']: {
      maxWidth: '80%',
      maxHeight: '100px'
    }
  },
  details: {
    display: "flex",
    flexDirection: "column-reverse",
    ['@media (max-width:600px)']: {
      marginTop: '50%'
    }
  },
  content: {
    flex: "1 0 auto"
  },
  name: {
    ['@media (max-width:600px)']: {
      fontSize: 'large'
    }
  },
  username: {
    ['@media (max-width:600px)']: {
      fontSize: 'small'
    }
  },
  cover: {
    minWidth: 296,
    minHeight: 237,
    ['@media (max-width:600px)']: {
      minWidth: "40%",
      minHeight: 120
    }
  },
  buttons: {
    marginTop: "15px",
    marginLeft: "-7px",
    ['@media (max-width:600px)']: {
      marginTop: "7px",
      marginBottom: "10px",
      marginLeft: "-7px"
    }
  }
}));

const FriendCard = props => {
  const classes = useStyles();

  const [user, setUser] = useState({});

  const deleteFriend = friendId => {
    if (window.confirm(`Are you sure you want to delete ${user.user.first_name + " " + user.user.last_name} as a friend?`)) {
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
        setUser(friend);
      });
    } else if (props.friend.sender_id === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.receiver_id).then(friend => {
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
              <Typography className={classes.name} component="h5" variant="h5">
                {user.user.first_name + " " + user.user.last_name}
              </Typography>
              <Typography className={classes.username} variant="subtitle1" color="textSecondary">
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
