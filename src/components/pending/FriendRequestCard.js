import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import "./FriendRequestCard.css";

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

const TrailRiderCard = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [user, setUser] = useState({});

  const acceptFriendRequest = () => {
    const updatedRequest = {
      senderId: props.request.sender_id,
      receiverId: props.request.receiver_id,
      isRequestPending: props.request.requestPending,
      isAccepted: true
    };
    // requestId is how the fetch PUT knows which 'friend' object to update
    const requestId = props.request.id;

    FriendsManager.updateRequest(updatedRequest, requestId).then(() => {
      props.viewFriendRequests();
    });
  };

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
              <Typography component="h5" variant="h5">
                {user.user.first_name + " " + user.user.last_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {user.user.username}
              </Typography>
              <div className={classes.buttons}>
                <Button onClick={acceptFriendRequest}>
                  Accept
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
