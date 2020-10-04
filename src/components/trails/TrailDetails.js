import React, { useState, useEffect } from "react";
import MediaQuery from 'react-responsive'
import TrailRiderCard from "./TrailRiderCard";
import TrailsManager from "../../modules/TrailsManager";
import UsersManager from "../../modules/UsersManager";
import "./TrailDetails.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "20px auto",
    maxWidth: "1000px",
    ['@media (max-width:600px)']: {
      maxWidth: '300px',
      maxHeight: '400px',
      display: "none"
    }
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
    minHeight: 237,
    ['@media (max-width:600px)']: {
      minWidth: 120,
      minHeight: 120
    }
  },
  buttons: {
    marginTop: "15px",
    marginLeft: "-7px"
  }
}));

const useMoreStyles = makeStyles(theme => ({
  root: {
    maxWidth: '80%',
    margin: '20px auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    // backgroundColor: red[500],
  },
  riders: {
    display: 'flex',
    marginLeft: '3%'
  },
  reviews: {
    marginLeft: '3%'
  },
}));

const TrailDetails = props => {
  const fullScreenClasses = useStyles();
  const mobileScreenClasses = useMoreStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Contains the data being displayed to the user
  const [trail, setTrail] = useState({});

  const [riders, setRiders] = useState([]);
  const [isNewRiderLoading, setIsNewRiderLoading] = useState(false);
  const [viewRiders, setViewRiders] = useState(false)

  // If the active user is one of the riders, disable the 'Add me as rider' button
  const activeUser = riders.find(rider => rider.user_id === props.activeUserId)

  // Runs on 'View Recent Riders' btn click
  const findTrailUsers = () => {
    UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
      setRiders(usersWithTrails);
    });
  };

  const viewRecentRiders = () => {
    setViewRiders(true)
  }

  // Runs when user wishes to add his/herself as a recent rider of the trail
  const addRecentRider = () => {
    setIsNewRiderLoading(true);

    const newUser = {
      user_id: props.activeUserId,
      trail_id: props.trailId
    };

    UsersManager.addUserWithTrail(newUser).then(() => {
      UsersManager.getUsersWithTrails(props.trailId).then(usersWithTrails => {
        setRiders(usersWithTrails);
      });
    });
  };

  // Gets the trail being viewed and sets trail state to display info on that trail 
  // Also getting all the riders of the trail and setting state.
  useEffect(() => {
    TrailsManager.get(props.trailId).then(trail => {
      console.log(trail)
      setTrail(trail)
    });
    findTrailUsers();
  }, []);

  return (
    <>
      <Card className={fullScreenClasses.root}>
        <CardMedia
          className={fullScreenClasses.cover}
          image={`${trail.trail_img}`}
          title={`${trail.trail_name}`}
        />
        <div className={fullScreenClasses.details}>
          <CardContent className={fullScreenClasses.content}>
            <Typography component="h5" variant="h5">
              {trail.trail_name}
            </Typography>
            <div className="trailDescription">
              <Typography variant="subtitle1" color="textSecondary">
                {trail.description}
              </Typography>
            </div>
            <div className="trailAddress">
              <Typography color="textPrimary">Address:</Typography>
              <Typography variant="body2" color="textSecondary">
                {trail.address}
              </Typography>
            </div>
            <div className={fullScreenClasses.buttons}>
              <Button onClick={viewRecentRiders}>View Recent Riders</Button>
              
              {activeUser ? (
                <Button onClick={addRecentRider} disabled>
                  I've Ridden Here Recently!
                </Button>
              ) : (
                <Button onClick={addRecentRider} disabled={isNewRiderLoading}>
                  I've Ridden Here Recently!
                </Button>
              )}

              {trail.creator_id === props.activeUserId ? (
                <Button href={`/trails/${trail.id}/edit`}>Edit</Button>
              ) : null}
            </div>
          </CardContent>
        </div>
      </Card>

      <MediaQuery maxDeviceWidth={600}>
        <Card className={mobileScreenClasses.root}>
          <CardHeader
            // avatar={
            //   <Avatar aria-label="recipe" className={mobileScreenClasses.avatar}>
            //     R
            //   </Avatar>
            // }
            title={`${trail.trail_name}`}
            subheader={`${trail.address}`}
          /> 
          <div>
          {trail.name}
          </div>
          <CardMedia
            className={mobileScreenClasses.media}
            image={`${trail.trail_img}`}
            title={`${trail.trail_name}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {trail.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <div className={mobileScreenClasses.riders}>
            <Typography >
              Recent Riders
            </Typography>
            <IconButton
              onClick={viewRecentRiders}
            >
              <PeopleAltIcon size="medium" />
              </IconButton>
            </div>
            <Typography className={mobileScreenClasses.reviews}>
              Reviews
            </Typography>
            <IconButton
              className={clsx(mobileScreenClasses.expand, {
                [mobileScreenClasses.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Future trail reviews go here!!!
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </MediaQuery>

      {!viewRiders ? null : (
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
