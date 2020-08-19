import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import UsersManager from "../../modules/UsersManager";
import "./TrailRiderCard.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "20px auto",
    maxWidth: "500px",
  },
  details: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  content: {
    flex: "1 0 auto",
    paddingBottom: "10px"
  },
  cover: {
    width: "100px",
    borderRadius: "3px"
  },
  buttons: {
    textDecoration: "none",
    marginLeft: "-5px",
    marginBottom: "-10px"
  }
}));

const TrailRiderCard = props => {
  const classes = useStyles();

  const [alreadyFriends, setAlreadyFriends] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [friendRequest, setFriendRequest] = useState({
    senderId: props.activeUserId,
    receiverId: props.rider.user.id,
    isRequestPending: false,
    isAccepted: false
  });

  const createFriendRequest = () => {
    const newFriendRequest = { ...friendRequest };
    setFriendRequest((newFriendRequest.isRequestPending = true));
    setIsLoading(true);
    FriendsManager.post(newFriendRequest);
  };

  const removeFromRidersList = () => {
    UsersManager.deleteUserWithTrail(props.rider.id).then(() => {
      props.findTrailUsers();
    });
  };

  // Getting all friends from DB, going through each friend and seeing if one friend has a receiverId that matches the active user & a
  // senderId that matches the TrailRiderCard we're viewing, OR vice-versa. If one friend in the DB meets the condition then we will
  // update state and hide the 'Add Friend' button for this card because that means they're already friends.

  // These conditionals are to hide the 'Add Friend' button on the card if the card is either the active user or their friend (via friend req sent to them or they sent req to active user).
  const getAllFriends = () => {
    FriendsManager.getAllFriends(props.activeUserId).then(friends => {
      const friend = friends.find(friend => {
        if (
          (friend.receiverId === props.activeUserId &&
            friend.senderId === props.rider.user.id) ||
          props.rider.user.id === props.activeUserId
        ) {
          return true;
        } else if (
          (friend.senderId === props.activeUserId &&
            friend.receiverId === props.rider.user.id) ||
          props.rider.user.id === props.activeUserId
        ) {
          return true;
        }
      });
      setAlreadyFriends(friend);
    });
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`${props.rider.user.avatar_img}`}
        title="Trail Rider Image"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.rider.user.user.first_name + " " + props.rider.user.user.last_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.rider.user.user.username}
          </Typography>
          <div className={classes.buttons}>
            {props.rider.user_id !== props.activeUserId &&
            alreadyFriends === undefined ? (
              <Button size="small" onClick={createFriendRequest} disabled={isLoading}>
                <PersonAddIcon fontSize="small" className="addFriendIcon"></PersonAddIcon>
                Add Friend
              </Button>
            ) : null}
            {props.rider.user.id === props.activeUserId ? (
              <Button size="small" onClick={removeFromRidersList}>Remove Me From List</Button>
            ) : null}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default TrailRiderCard;
