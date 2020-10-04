import React from "react";
import TrailsManager from "../../modules/TrailsManager";
import "./TrailCard.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "20px 0 20px 0",
    ['@media (max-width:600px)']: {
      maxWidth: '100%',
      maxHeight: '100px'
    }
  },
  details: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  content: {
    flex: "1 0 auto",
  },
  header: {
    ['@media (max-width:600px)']: {
      fontSize: '1rem'
    }
  },
  description: {
    ['@media (max-width:600px)']: {
      display: 'none'    
    }
  },
  cover: {
    width: 151,
    minWidth: 296,
    minHeight: 237,
    ['@media (max-width:600px)']: {
      minWidth: "40%",
      minHeight: 120
    }
  },
  buttons: {
    textDecoration: "none",
    marginTop: "15px",
    marginLeft: "-7px",
    ['@media (max-width:600px)']: {
      display: 'flex',
      margin: '0 0 0px 15%',
      padding: 0      
    }
  },
  detailsButton: {
    ['@media (max-width:600px)']: {
      color: 'gray'
    }
  }
}));

const TrailCard = props => {
  const classes = useStyles();

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
        image={`${props.trail.trail_img}`}
        title={`${props.trail.trail_name}`}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.header}>
            {props.trail.trail_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.description}>
            {props.trail.description}
          </Typography>
          <div className={classes.buttons}>
            <Button href={`/trails/${props.trail.id}`} className={classes.detailsButton}>Details</Button>

            {props.trail.creator_id === props.activeUserId ? (
              <>
                <Button href={`/trails/${props.trail.id}/edit`}>Edit</Button>
                <Button onClick={deleteTrail} color="secondary">Delete</Button>
              </>
            ) : null}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default TrailCard;
