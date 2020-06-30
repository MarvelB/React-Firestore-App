import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { isLoaded } from "react-redux-firebase";

const Navbar = (props) => {
    
    const { auth, profile } = props;
    const inOrOutLinks = auth.uid ? (
        <>
            <li><NavLink onClick={props.signOut}>Sign Out</NavLink></li>
            <li>
                <div className="sidenav-trigger" data-target="slide-out">
                <NavLink to="#" className="btn btn-floating red">{ profile.initials }</NavLink>
                </div>
            </li>
        </>
    ) : (
        <>
            <li><NavLink to="/Login">Login</NavLink></li>
            <li><NavLink to="/Signup">Signup</NavLink></li>
        </>
    );

    return(
        <nav className="nav-wrapper brown darken-1">
            <div className="container">
                <NavLink className="brand-logo left" to="/">
                    DBeauty
                </NavLink>
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/nails">Nails</NavLink></li>
                    <li><NavLink to="/hairStyles">Hair</NavLink></li>
                    {isLoaded(auth) && inOrOutLinks}
                </ul>
            </div>
        </nav>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);