import React from "react"
import { Route, Redirect } from "react-router-dom"

// Welcome goes here
// Register goes here
// Login goes here
// Home goes here
import Home from "./home/Home"
// Trails goes here
// Friends goes here
// Pending Reqs goes here

// TODO: create the first components needed below and import them above

const ApplicationViews = props => {
    return (
        <>
            {/* TODO: will add these routes when ready */}
            {/* <Route exact path="/welcome" render={props => {
                return <Home />
            }}/>
            <Route exact path="/login" render={props => {
                return <Login {...props} />
            }}/>
            <Route exact path="/register" render={props => {
                return <Register {...props} />
            }}/> */}
            <Route exact path="/home" render={props => {
                return <Home />
            }}/>
            {/* <Route exact path="/trailsearch" render={props => {
                return <TrailSearch {...props} />
            }}/> */}
            {/* below route will render upon trail search, based on zip code */}
            {/* <Route path="/trailslist" render={props => {
                return <TrailsList {...props} />
            }}/> */}
            {/* <Route path="/traildetails" render={props => {
                return <TrailDetails {...props} />
            }}/> */}
            {/* <Route exact path="/friends" render={props => {
                return <FriendsList {...props} />
            }}/> */}
            {/* <Route exact path="/pending" render={props => {
                return <PendingRequestsList {...props} />
            }}/> */}
        </>
    )
}

export default ApplicationViews;