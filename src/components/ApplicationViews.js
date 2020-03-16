import React from "react"
import { Route } from "react-router-dom"

// Welcome goes here
import Welcome from "./welcome/Welcome"
// Register goes here
// Login goes here
import Login from "./auth/Login"
// Home goes here
import Home from "./home/Home"
// Trails goes here
import Trails from "./trails/Trails"
// Friends goes here
import Friends from "./friends/Friends"
// Pending Reqs goes here
import PendingFriends from "./pending/PendingFriends"

// TODO: create the first components needed below and import them above

const ApplicationViews = props => {

    const hasUser = props.hasUser;
    const setUser = props.setUser;
    
    return (
        <>
            {/* TODO: will add these routes when ready */}
            <Route exact path="/welcome" render={props => {
                return <Welcome {...props} />
            }}/>
            
            <Route exact path="/login" render={props => {
                return <Login setUser={setUser} {...props} />
            }}/>
            {/*
            <Route exact path="/register" render={props => {
                return <Register {...props} />
            }}/> */}
            <Route exact path="/home" render={props => {
                return <Home />
            }}/>
            <Route exact path="/trails" render={props => {
                return <Trails {...props} />
            }}/>
            {/* below route will render upon trail search, based on zip code */}
            {/* <Route path="/trailslist" render={props => {
                return <TrailsList {...props} />
            }}/> */}
            {/* <Route path="/traildetails" render={props => {
                return <TrailDetails {...props} />
            }}/> */}
            <Route exact path="/friends" render={props => {
                return <Friends {...props} />
            }}/>
            <Route exact path="/pending" render={props => {
                return <PendingFriends {...props} />
            }}/>
        </>
    )
}

export default ApplicationViews;