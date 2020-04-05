import React, { useState } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

import { TextField } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  textInput: {
    margin: "10px 5px 10px 0"
  },
  addTrailButton: {
    textDecoration: "none",
    marginTop: "10px",
    marginRight: "40px"
  },
  searchButton: {
    marginTop: "20px"
  },
  searchContainer: {
    marginLeft: "40px"
  }
}));

const TrailList = props => {
  const classes = useStyles();
  const theme = useTheme();

  const activeUserId = props.activeUserId;

  const [zipcode, setZipcode] = useState({ value: "" });
  const [trails, setTrails] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...zipcode };
    stateToChange.value = evt.target.value;
    setZipcode(stateToChange);
  };

  // runs when user hits search button with zipcode
  const findMatchingTrails = evt => {
    evt.preventDefault();

    TrailsManager.getSomeTrails(zipcode.value).then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };

  // runs when user deletes a trail they created to re-set state and remove deleted trail from list in realtime (got this idea from Friends.js component)
  const findUpdatedTrails = () => {
    TrailsManager.getSomeTrails(zipcode.value).then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };

  return (
    <>
      <div className="trailListContainer">
        <div className="trailSearchBox"></div>
        <form onSubmit={findMatchingTrails} className={classes.root}>
          <div className={classes.searchContainer}>
            <TextField
              id="outlined-basic"
              label="Enter Zip Code"
              variant="outlined"
              size="small"
              className={classes.textInput}
              onChange={handleFieldChange}
            />
            <Button type="submit" size="small" className={classes.searchButton}>
              Search
            </Button>
          </div>

          <Button
            href="/trails/addTrail"
            size="small"
            className={classes.addTrailButton}
          >
            Add a Trail
          </Button>
        </form>

        <div className="dynamicTrailListContainer">
          {/* Before submit btn clicked and api fetch runs, trails.length is 0, after search its length is > than 0 so will render the cards!! */}
          {trails.length === 0 ? (
            <div className="searchDescriptionContainer">
              <Typography className="searchDescription" component="h3" variant="h3">
                Search For Nearby Trails!
              </Typography>
            </div>
          ) : (
            <div>
              <section>
                {trails.map(trail => {
                  return (
                    <TrailCard
                      key={trail.id}
                      activeUserId={activeUserId}
                      trail={trail}
                      findUpdatedTrails={findUpdatedTrails}
                      {...props}
                    />
                  );
                })}
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrailList;
