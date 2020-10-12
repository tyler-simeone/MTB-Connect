import React, { useState } from "react";
import "./Trails.css";
import TrailsManager from "../../modules/TrailsManager";
import TrailCard from "./TrailCard";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { ReactBingmaps } from 'react-bingmaps';

const useStyles = makeStyles((theme) => ({
  trailListContainer: {
    width: '100%'
  },
  root: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  searchContainer: {
    ['@media (max-width:600px)']: {
      display: 'flex',
      marginLeft: '5px',
      height: '50px'
    }
  },
  trailsImg: {
    minWidth: '100%'
  },
  textInput: {
    margin: "10px 5px 10px 0",
    // backgroundColor: "#C1C3C6",
    '& label.Mui-focused': {
      color: 'gray',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
      },
      ['@media (min-width:601px)']: {
        '&.Mui-focused fieldset': {
          border: '3px solid #2c77b8',
          fontSize: '10px',
        },
      },
      ['@media (max-width:600px)']: {
        '& .MuiInputBase-input': {
          height: '1.5em'
        }
      }
    },
    ['@media (max-width:600px)']: {
      fontSize: '18px',
      height: 35,
      minWidth: '50%',
      margin: '10px 0 0 5px',
      '& label': {
        fontSize: '70%',
      },
      '& label.Mui-focused': {
        color: 'gray',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'gray',
          height: '100%',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid #2c77b8',
          fontSize: '10px',
        },
    },
    }
  },
  addTrailButton: {
    textDecoration: "none",
    marginTop: "10px",
    marginBottom: "10px",
    ['@media (max-width:600px)']: {
      margin: "5px 0 0 10px",
      fontSize: '12px'
    }
  },
  searchButton: {
    marginTop: "14px",
    ['@media (max-width:600px)']: {
      marginTop: "8px",
      marginLeft: "5px",
      fontSize: '12px'
    },
    ['@media (min-width:601px)']: {
      margin: '15px 0 5px 10px'
    }
  }
}));

const TrailList = props => {
  const classes = useStyles();

  const activeUserId = props.activeUserId;

  const [zipcode, setZipcode] = useState({ value: "" });
  const [trails, setTrails] = useState([]);
  const [center, setCenter] = useState([]);
  const [pushpins] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...zipcode };
    stateToChange.value = evt.target.value;
    setZipcode(stateToChange);
  };

  const pushpinClick = (trailId) => {
    return props.history.push(`/trails/${trailId}`)
  }

  
  const findMatchingTrails = evt => {
    evt.preventDefault();

    // Fetch all trails and dynamically create pushpins for them,
    // then set map center based on zipcode, then get local trails
    // for the trail list based on zipcode
    TrailsManager.getAllTrails()
      .then(trailsFromApi => {
        let trail;

        for (trail of trailsFromApi) {

          const trailName = trail.trail_name
          const trailId = trail.id

          const trailAddress = trail.address.split(',')
          const city = trailAddress[1]
          const address = trailAddress[0]
          const state = trailAddress[2]

          getTrailCoordinates(state, city, address)
            .then(data => {
              
              pushpins.push(
                {
                  "location":[data[0],data[1]], 
                  "option":{ color: 'red', title: trailName },
                  "addHandler": {"type" : "click", "callback": () => pushpinClick(trailId)}
                }
              )
            })
        }
      }).then(() => {
        getCenterCoordinates(zipcode.value)
          .then(data => {
            setCenter(data)
          })
      }).then(() => {
        TrailsManager.getSomeTrails(zipcode.value)
          .then(response => setTrails(response))
      })
  };

  // ######## START OF BING GEOCODE 

  const getCenterCoordinates = (zipcode) => {
    return fetch(`http://dev.virtualearth.net/REST/v1/Locations?postalCode=${encodeURIComponent(zipcode)}&key=Ag8GCDrZaiH9APHgfUUFslli9JwA8NHO38GRr4LvN1fi4ZOlCreit-juSSX9trBz`)
      .then(resp => resp.json())
      .then(data => {
        const result = data.resourceSets[0].resources[0].point.coordinates;

        return result;
      })
  }

  const getTrailCoordinates = (state, city, address) => {
    return fetch(`http://dev.virtualearth.net/REST/v1/Locations?adminDistrict=${encodeURIComponent(state)}&locality=${encodeURIComponent(city)}&addressLine=${encodeURIComponent(address)}&key=Ag8GCDrZaiH9APHgfUUFslli9JwA8NHO38GRr4LvN1fi4ZOlCreit-juSSX9trBz`)
      .then(resp => resp.json())
      .then(data => {
        const result = data.resourceSets[0].resources[0].point.coordinates;

        return result;
      })
  }

  // ######## END OF BING GEOCODE 


  // runs when user deletes a trail they created from the trail card
  // to re-set state and remove deleted trail from list in realtime 
  // (got this idea from Friends.js component)
  const findUpdatedTrails = () => {
    TrailsManager.getSomeTrails(zipcode.value).then(trailsFromApi => {
      setTrails(trailsFromApi);
    });
  };

  return (
    <>
      <div >
        <div className="trailSearchBoxContainer">
          <div className="trailSearchBox">
            {!center.length ? (
            <img className={classes.trailsImg} src="https://2qibqm39xjt6q46gf1rwo2g1-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/8212290_web1_L1Darrington-trails-edh-1708.jpg" />
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
                label="Zip Code"
                variant="outlined"
                size="small"
                color="white"
                className={classes.textInput}
                onChange={handleFieldChange}
                required
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
              Add Trail
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
                Find Nearby Trails!
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
