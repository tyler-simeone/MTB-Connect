import React from "react"
import { Route, Redirect } from "react-router-dom"

// Welcome 
import Welcome from "./welcome/Welcome"
// Register 
import Register from "./auth/Register"
// Login 
import Login from "./auth/Login"
// Home 
import Home from "./home/Home"
// User Profile
import Profile from "./users/profile"
// Trails 
import TrailList from "./trails/TrailList"
import CreateTrail from "./trails/CreateTrail"
import TrailDetails from "./trails/TrailDetails"
import TrailEdit from "./trails/EditTrail"
// Friends 
import Friends from "./friends/Friends"
// Pending Reqs 
import PendingFriends from "./pending/PendingFriends"

// APPLICATION VIEWS calls/invokes the React component functions when the path matches
const ApplicationViews = props => {
    const activeUser = sessionStorage.getItem("Active User Id");
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const userInfo = props.userInfo;
    
    return (
        <>
            <Route exact path="/" render={props => {
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
                    return <Redirect to="/" />
                }
            }}/>
            <Route exact path="/profile" render={props => {
                if (hasUser) {
                    return <Profile userInfo={userInfo} />
                } else {
                    return <Redirect to="/" />
                }
            }}/>
            <Route exact path="/trails" render={props => {
                if (hasUser) {
                    return <TrailList activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }}/>
            <Route exact path="/trails/addTrail" render={props => {
                if (hasUser) {
                    return <CreateTrail activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }}/>
            <Route exact path="/trails/:trailId(\d+)" render={props => {
                if (hasUser) {
                    return <TrailDetails trailId={parseInt(props.match.params.trailId)} activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }}/>
            <Route path="/trails/:trailId(\d+)/edit" render={props => {
                if (hasUser) {
                    return <TrailEdit trailId={parseInt(props.match.params.trailId)} {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }}/>
            <Route exact path="/friends" render={props => {
                if (hasUser) {
                    return <Friends activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }}/>
            <Route exact path="/pending" render={props => {
                if (hasUser) {
                    return <PendingFriends activeUserId={parseInt(activeUser)} {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }}/>
        </>
    )
}

export default ApplicationViews;