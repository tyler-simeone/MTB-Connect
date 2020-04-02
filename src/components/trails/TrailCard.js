import React from "react";
import { Link } from "react-router-dom";
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
    minHeight: 250
  },
  buttons: {
    textDecoration: "none"
  }
}));

const TrailCard = props => {
  const classes = useStyles();
  const theme = useTheme();

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
              <Button href={`/trails/${props.trail.id}/edit`}>
                Edit
              </Button>
            ) : null}
          </div>
        </CardContent>
      </div>
    </Card>

    // <>
    //   <div className="trailCardContainer">
    //     <img
    //       src={`${props.trail.img}`}
    //       alt={`${props.trail.name}`}
    //       height="237"
    //       width="296"
    //       className="trailCardImg"
    //     />

    //     <div className="stackContent">
    //       <section className="trailInfo">
    //         <h2>{props.trail.name}</h2>
    //         <p>{props.trail.description}</p>
    //       </section>

    //       <div className="trailCardButtonContainer">
    //         <Link to={`/trails/${props.trail.id}`}>
    //           <button className="trailCardButton" type="button">
    //             Details
    //           </button>
    //         </Link>
    //         {props.trail.creatorId === props.activeUserId ? (
    //           <Link to={`/trails/${props.trail.id}/edit`}>
    //             <button className="trailCardButton" type="button">
    //               Edit
    //             </button>
    //           </Link>
    //         ) : null}
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default TrailCard;
