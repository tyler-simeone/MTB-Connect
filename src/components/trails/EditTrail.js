import React, { useState, useEffect } from "react";
import TrailsManager from "../../modules/TrailsManager";
// import "./TrailEdit.css";

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
    minWidth: 296,
    minHeight: 237
  },
  buttons: {
    marginTop: "15px",
    marginLeft: "-7px"
  }
}));

const TrailEdit = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [trail, setTrail] = useState({
    name: "",
    img: "",
    description: "",
    zipcode: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...trail };
    stateToChange[evt.target.id] = evt.target.value;
    setTrail(stateToChange);
  };

  const updateTrailDescription = evt => {
    evt.preventDefault();
    setIsLoading(true);
    
    // will create new trail and then return user to trails page (where they will then have to search for that trail)
    TrailsManager.update(trail, props.trailId).then(() => {
      props.history.push(`/trails/${props.trailId}`);
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
          title="Trail Image"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {trail.name}
            </Typography>
            <textarea
              value={trail.description}
              onChange={handleFieldChange}
              id="description"
            ></textarea>
            <div className={classes.buttons}>
              <Button onClick={updateTrailDescription} disabled={isLoading}>Submit</Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* <div className="trailCardContainer">
        <figure className="imageContainer">
          <img src={require(`${props.trail.img}`)} alt="Trail Image" />
        </figure>

        <section className="trailCard">
          <form onSubmit={updateTrailDescription}>
            <h2>{trail.name}</h2>
            <textarea
              value={trail.description}
              onChange={handleFieldChange}
              id="description"
            ></textarea>
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </form>
        </section>
      </div> */}
    </>
  );
};

export default TrailEdit;
