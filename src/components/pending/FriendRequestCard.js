import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import "./FriendRequestCard.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
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
      fontSize: 'medium'
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
      display: 'flex',
      marginTop: "7px",
      marginBottom: "10px",
      marginLeft: "-7px",
    }
  }
}));

const TrailRiderCard = props => {
  const classes = useStyles();

  const [user, setUser] = useState({});

  const acceptFriendRequest = () => {
    const updatedRequest = {
      senderId: props.request.sender_id,
      receiverId: props.request.receiver_id,
      isRequestPending: props.request.requestPending,
      isAccepted: true
    };

    const requestId = props.request.id;

    FriendsManager.updateRequest(updatedRequest, requestId).then(() => {
      props.viewFriendRequests();
    });
  };

  const deleteFriendRequest = () => {
    const result = window.confirm("Are you sure you want to delete this request?");

    if (result) {
      FriendsManager.deleteFriend(props.request.id).then(() => props.viewFriendRequests())
    }
  }

  const renderFriend = () => {
    FriendsManager.getFriendUserInfo(props.request.sender_id).then(friend => {
      setUser(friend);
    });
  };

  useEffect(() => {
    renderFriend();
  }, []);

  return (
    <>
      {user.user ? (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={`${user.avatar_img}`}
            title="Pending Friend Image"
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
                <Button onClick={acceptFriendRequest}>
                  Accept
                </Button>
                <Button onClick={deleteFriendRequest} color="secondary">
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

export default TrailRiderCard;
