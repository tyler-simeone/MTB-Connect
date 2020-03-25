import React from "react"
import { Route, Redirect } from "react-router-dom"


/**** 
 THIS IS MY MVP BRANCH
****/

// Welcome goes here
import Welcome from "./welcome/Welcome"
// Register goes here
import Register from "./auth/Register"
// Login goes here
import Login from "./auth/Login"
// Home goes here
import Home from "./home/Home"
// Trails goes here
import TrailList from "./trails/TrailList"
import CreateTrail from "./trails/CreateTrail"
import TrailDetails from "./trails/TrailDetails"
import TrailEdit from "./trails/EditTrail"
// Friends goes here
import Friends from "./friends/Friends"
// Pending Reqs goes here
import PendingFriends from "./pending/PendingFriends"

const ApplicationViews = props => {
    const activeUser = sessionStorage.getItem("Active User Id");
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    
    return (
        <>
            <Route exact path="/welcome" render={props => {
                return <Welcome {...props} />
            }}/>
            
            <Route exact path="/login" render={props => {
                return <Login setUser={setUser} {...props} />
            }}/>
            <Route exact path="/register" render={props => {
                return <Register setUser={setUser} {...props} />
            }}/> 
            <Route exact path="/home" render={props => {
                if (hasUser) {
                    return <Home />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route exact path="/trails" render={props => {
                if (hasUser) {
                    return <TrailList activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route exact path="/trails/addTrail" render={props => {
                if (hasUser) {
                    return <CreateTrail activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route exact path="/trails/:trailId(\d+)" render={props => {
                if (hasUser) {
                    return <TrailDetails trailId={parseInt(props.match.params.trailId)} activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route path="/trails/:trailId(\d+)/edit" render={props => {
                if (hasUser) {
                    return <TrailEdit trailId={parseInt(props.match.params.trailId)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route exact path="/friends" render={props => {
                if (hasUser) {
                    return <Friends activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route exact path="/pending" render={props => {
                if (hasUser) {
                    return <PendingFriends activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
        </>
    )
}

export default ApplicationViews;