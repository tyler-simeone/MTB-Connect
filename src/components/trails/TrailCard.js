import React, { useEffect } from "react";
import TrailsManager from "../../modules/TrailsManager";
import "./TrailCard.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "20px 0 20px 0"
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
    textDecoration: "none",
    marginTop: "15px",
    marginLeft: "-7px"
  }
}));

const TrailCard = props => {
  const classes = useStyles();
  const theme = useTheme();

  const deleteTrail = () => {
    const trailToDelete = props.trail.id;

    const result = window.confirm("Are you sure you want to delete this trail?");

    if (result) {
      TrailsManager.delete(trailToDelete).then(() => {
        props.findUpdatedTrails();
      });
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`${props.trail.img}`}
        title={`${props.trail.name}`}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.trail.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.trail.description}
          </Typography>
          <div className={classes.buttons}>
            <Button href={`/trails/${props.trail.id}`}>Details</Button>

            {props.trail.creatorId === props.activeUserId ? (
              <>
                <Button href={`/trails/${props.trail.id}/edit`}>Edit</Button>
                <Button onClick={deleteTrail}>Delete</Button>
              </>
            ) : null}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default TrailCard;
