import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

const Navbar = (props) => {
    
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
                    <li><NavLink to="/Login">Login</NavLink></li>
                    <li><NavLink to="/Signup">Signup</NavLink></li>
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(Navbar);