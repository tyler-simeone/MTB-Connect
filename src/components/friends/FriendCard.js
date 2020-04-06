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
    FriendsManager.deleteFriend(friendId).then(() => {
      props.getAllFriends();
    });
  };

  // NOTE: if you're the receiving user of the friend req. you will see data (via user state) for the sender, and vice-versa if logged-in as request sender
  const renderFriend = () => {
    if (props.friend.receiverId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.senderId).then(friend => {
        setUser(friend);
      });
    } else if (props.friend.senderId === props.activeUser) {
      FriendsManager.getFriendUserInfo(props.friend.receiverId).then(friend => {
        setUser(friend);
      });
    }
  };

  useEffect(() => {
    renderFriend();
  }, []);

  return (
    <>
      {user.fullName != null ? (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={`${user.avatarImg}`}
            title={`${user.fullName}`}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {user.fullName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {user.username}
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
