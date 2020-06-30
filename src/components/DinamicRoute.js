import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login/Login";
import Home from "./Home/Home"

const DinamicRoute = ({ component: RouteComponent, auth, blockLoggedIn, ...rest }) => {
    
    return (
        <Route {...rest} render={routeProps => 
            blockLoggedIn ? 
            (auth.isLoaded && auth.uid ? (<Home />) : auth.isLoaded ? (<RouteComponent {...routeProps} />) : <></>) :
            (auth.isLoaded && auth.uid ? (<RouteComponent {...routeProps} />) : auth.isLoaded ? (<Login />) : <></>)} />
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(DinamicRoute);