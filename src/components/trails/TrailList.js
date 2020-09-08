import React, { useState } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

import { TextField } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { ReactBingmaps } from 'react-bingmaps';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  textInput: {
    margin: "10px 5px 10px 0",
    backgroundColor: "#C1C3C6"
  },
  addTrailButton: {
    textDecoration: "none",
    marginTop: "10px",
    marginBottom: "10px"
  },
  searchButton: {
    marginTop: "14px"
  }
}));

const TrailList = props => {
  const classes = useStyles();

  const activeUserId = props.activeUserId;

  const [zipcode, setZipcode] = useState({ value: "" });
  const [trails, setTrails] = useState([]);
  const [center, setCenter] = useState([])
  const [pushpins, setPushpins] = useState([
      // {
      //   "location":[36.083286, -86.872673], 
      //   "option":{ color: 'red', title: 'Percy Warner' }
      // },
      {
        "location":[35.926143, -86.810809], 
        "option":{ color: 'red', title: 'Cool Springs Trail' }
      },
      {
        "location":[35.667251, -87.083719], 
        "option":{ color: 'red', title: 'Chickasaw Trace' }
      },
      {
        "location":[35.942848, -83.890747], 
        "option":{ color: 'red', title: 'Baker Creek Preserve' }
      },
      {
        "location":[36.112470, -87.267252], 
        "option":{ color: 'red', title: 'Montgomery Bell' }
      },
      {
        "location":[36.333622, -86.470243], 
        "option":{ color: 'red', title: 'Lock 4' }
      }
    ]);

  const handleFieldChange = evt => {
    const stateToChange = { ...zipcode };
    stateToChange.value = evt.target.value;
    setZipcode(stateToChange);
  };

  
  const findMatchingTrails = evt => {
    evt.preventDefault();

    // TODO: dynamically set center based on zipcode 
    // (will need geocode api)
    if (zipcode.value === "37067") {
      setCenter([35.915133, -86.799713])
    } else if (zipcode.value === "37027") {
      setCenter([36.086687, -87.263037])
    } else if (zipcode.value === "37920") {
      setCenter([35.938448, -83.891190])
    }

    // geocode(zipcode.value)

    // TODO: fetch all trails, and dynamically create pushpins for them
    // (will need geocode api)
    TrailsManager.getSomeTrails(zipcode.value)
      .then(trailsFromApi => {
        // let trail;
        // for (trail of trailsFromApi) {
          // console.log(trail)
          // pushpins.push(
          //   {
          //     "location":[,], 
          //     "option":{ color: 'red', title: trail.trail_name }
          //   }
          // )
        // }
        setTrails(trailsFromApi);
    }).then(geocode(zipcode.value));
  };

  // ######## START OF BING GEOCODE 

  const geocode = query => {
    const geocodeRequest = `http://dev.virtualearth.net/REST/v1/Locations?query=${encodeURIComponent(query)}&jsonp=GeocodeCallback&key=Ag8GCDrZaiH9APHgfUUFslli9JwA8NHO38GRr4LvN1fi4ZOlCreit-juSSX9trBz`

    CallRestService(geocodeRequest, GeocodeCallback);
  }

  function GeocodeCallback(response) {
    if (response &&
        response.resourceSets &&
        response.resourceSets.length > 0 &&
        response.resourceSets[0].resources) {

        let results = response.resourceSets[0].resources;

        console.log(results)
      }
  }

  function CallRestService(request) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    document.body.appendChild(script);
  }

  // ######## END OF BING GEOCODE 



  // runs when user deletes a trail they created to re-set state and remove deleted trail from list in realtime (got this idea from Friends.js component)
  const findUpdatedTrails = () => {
    TrailsManager.getSomeTrails(zipcode.value).then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };


  return (
    <>
      <div className="trailListContainer">
        <div className="trailSearchBoxContainer">
          <div className="trailSearchBox">
            {trails.length === 0 ? (
            <img src="https://2qibqm39xjt6q46gf1rwo2g1-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/8212290_web1_L1Darrington-trails-edh-1708.jpg" />
            ) : (
              <div className="bingMapContainer">
                <ReactBingmaps 
                  mapTypeId={"canvasLight"}
                  bingmapKey = "Ag8GCDrZaiH9APHgfUUFslli9JwA8NHO38GRr4LvN1fi4ZOlCreit-juSSX9trBz"
                  center={center}
                  zoom={10}
                  pushPins = {pushpins}
                  > 
                </ReactBingmaps>
              </div>
            )}
          </div>
          <form onSubmit={findMatchingTrails} className={classes.root}>
            <div className={classes.searchContainer}>
              <TextField
                id="outlined-basic"
                label="Enter Zip Code"
                variant="outlined"
                size="small"
                color="white"
                className={classes.textInput}
                onChange={handleFieldChange}
              />
              <Button
                type="submit"
                size="small"
                className={classes.searchButton}
              >
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
        </div>
        
        <div className="dynamicTrailListContainer">
          {/* Before submit btn clicked and api fetch runs, trails.length is 0, after search its length is > than 0 so will render the cards!! */}
          {trails.length === 0 ? (
            <div className="searchDescriptionContainer">
              <Typography
                className="searchDescription"
                component="h3"
                variant="h3"
              >
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
