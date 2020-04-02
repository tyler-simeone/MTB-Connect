import React, { useState, useEffect } from "react";
import TrailRiderCard from "./TrailRiderCard";
import TrailsManager from "../../modules/TrailsManager";
import UsersManager from "../../modules/UsersManager";
import "./TrailDetails.css";

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
    maxWidth: "1000px"
  },
  details: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    minWidth: 296,
    minHeight: 237
  },
  buttons: {
    marginTop: "15px",
    marginLeft: "-7px"
  }
}));

const TrailDetails = props => {
  const classes = useStyles();
  const theme = useTheme();

  // Contains the data being displayed to the user
  const [trail, setTrail] = useState({
    name: "",
    img: "",
    description: "",
    zipcode: "",
    creatorId: ""
  });
  const [riders, setRiders] = useState([]);
  const [isNewRiderLoading, setIsNewRiderLoading] = useState(false);

  // Runs on 'View Recent Riders' btn click
  const findTrailUsers = () => {
    UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
      setRiders(usersWithTrails);
    });
  };

  // Runs when user wishes to add his/herself as a recent rider of the trail
  const addRecentRider = () => {
    setIsNewRiderLoading(true);

    const newUser = {
      userId: props.activeUserId,
      trailId: props.trailId
    };

    UsersManager.addUserWithTrail(newUser).then(() => {
      UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
        setRiders(usersWithTrails);
      });
    });
  };

  // Gets the trail being viewed and sets trail state to display info on that trail
  useEffect(() => {
    TrailsManager.get(props.trailId).then(trail => setTrail(trail));
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={`${trail.img}`}
          title={`${trail.name}`}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {trail.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {trail.description}
            </Typography>
            <div className={classes.buttons}>
              <Button onClick={findTrailUsers}>View Recent Riders</Button>
              <Button onClick={addRecentRider} disabled={isNewRiderLoading}>I've Ridden Here Recently!</Button>

              {trail.creatorId === props.activeUserId ? (
              <Button href={`/trails/${trail.id}/edit`}>
                Edit
              </Button>
            ) : null}
            </div>
          </CardContent>
        </div>
      </Card>

      {riders.length === 0 ? null : (
        <section className="recentRidersContainer">
          {riders.map(rider => {
            return (
              <TrailRiderCard
                key={rider.id}
                activeUserId={props.activeUserId}
                rider={rider}
                findTrailUsers={findTrailUsers}
                {...props}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default TrailDetails;
