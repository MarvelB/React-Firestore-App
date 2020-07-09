import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { useFirestoreDocData, useUser } from 'reactfire';

const NavbarSignedIn = ({ firestore, firebase }) => {
    //All of this is safe, this component has been wrapped in an 'AuthCheck'
    const user = useUser();
    const userProfileRef = firestore.collection('users').doc(user.uid);

    const profile = useFirestoreDocData(userProfileRef);

    const handleSignout = (e) => {
        firebase.signOut();
    }
    
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
                    <li><NavLink to="/" onClick={handleSignout}>Sign Out</NavLink></li>
                    <li>
                        <div className="sidenav-trigger" data-target="slide-out">
                        <NavLink to="#" className="btn btn-floating red">{ profile.initials }</NavLink>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(NavbarSignedIn);