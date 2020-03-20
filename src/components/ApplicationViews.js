import React from "react"
import { Route, Redirect } from "react-router-dom"

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
import TrailDetails from "./trails/TrailDetails"
// Friends goes here
import Friends from "./friends/Friends"
// import AddFriendForm from "./friends/AddFriendForm"
// Pending Reqs goes here
import PendingFriends from "./pending/PendingFriends"

// TODO: create the first components needed below and import them above

const ApplicationViews = props => {
    const activeUser = sessionStorage.getItem("Active User Id");
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
                    return <TrailList {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route path="/trails/:trailId(\d+)" render={props => {
                if (hasUser) {
                    return <TrailDetails trailId={parseInt(props.match.params.trailId)} activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            {/* <Route path="/trails/addFriend" render={props => {
                if (hasUser) {
                    return <AddFriendForm activeUser={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/> */}
            <Route exact path="/friends" render={props => {
                if (hasUser) {
                    return <Friends {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
            <Route exact path="/pending" render={props => {
                if (hasUser) {
                    return <PendingFriends {...props} />
                } else {
                    return <Redirect to="/welcome" />
                }
            }}/>
        </>
    )
}

export default ApplicationViews;