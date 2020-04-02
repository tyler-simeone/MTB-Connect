import React, { useState } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";
import { TextField } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  // root: {
  //   display: "flex",
  //   margin: "20px auto",
  //   maxWidth: "1000px"
  // },
  formContent: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  searchContainer: {},
  textInput: {
    margin: "10px 5px 10px 0"
  },
  addTrailButton: {
    textDecoration: "none",
    marginTop: "10px"
  },
  searchButton: {
    marginTop: "20px"
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
    stateToChange[evt.target.id] = evt.target.value;
    setZipcode(stateToChange);
  };

  const findMatchingTrails = evt => {
    evt.preventDefault();

    TrailsManager.getSomeTrails(zipcode.value).then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };

  return (
    <>
      <div className="trailListContainer">
        <div className="trailSearchBox"></div>
        <form onSubmit={findMatchingTrails} className={classes.formContent}>
          <div className={classes.searchContainer}>
            <TextField
              id="outlined-basic"
              label="Enter Zip Code"
              variant="outlined"
              size="small"
              className={classes.textInput}
              onChange={handleFieldChange}
            />
            <Button
              onClick={findMatchingTrails}
              size="small"
              className={classes.searchButton}
            >
              Search
            </Button>
          </div>

          <Button href="/trails/addTrail" size="small" className={classes.addTrailButton}>
            Add a Trail
          </Button>
        </form>

        <div className="dynamicTrailListContainer">
          {/* Before submit btn clicked and api fetch runs, trails.length is 0, after search its length is > than 0 so will render the cards!! */}
          {trails.length === 0 ? (
            <div className="searchDescriptionContainer">
              <h1 className="searchDescription">Search For Nearby Trails!</h1>
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
