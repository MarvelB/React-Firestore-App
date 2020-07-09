import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import M from "materialize-css/dist/js/materialize";
import { useFirestoreDocData, useUser } from 'reactfire';

const Sidenav = ({ firestore, firebase }) => {
    //All of this is safe, this component has been wrapped in an 'AuthCheck'
    const user = useUser();
    const userProfileRef = firestore.collection('users').doc(user.uid);

    const profile = useFirestoreDocData(userProfileRef);

    const handleSignOut = (e) => {
        firebase.signOut();
    }

    useEffect(() => {
        var sideNav = document.querySelector("#slide-out");
        M.Sidenav.init(sideNav, {
            edge: "right"
        });
    });

    return (
        <div>
            <ul className="sidenav" id="slide-out">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={profile.picture} width="300" />
                        </div>
                        <NavLink to="/profile" className="sidenav-close"><span className="btn btn-floating red">{profile.initials}</span></NavLink>
                        <NavLink to="/profile" className="sidenav-close"><span className="black-text bold name">{profile.firstName + " " + profile.lastName}</span></NavLink>
                    </div>
                </li>
                <li><NavLink to="/profile" className="waves-effect sidenav-close">Profile</NavLink></li>
                <li><div className="divider"></div></li>
                <li><NavLink className="waves-effect sidenav-close" to="/appointments">Appointments</NavLink></li>
                <li><div className="divider"></div></li>
                <li><NavLink className="waves-effect sidenav-close" to="/create-appointment">Create Appointment</NavLink></li>
                <li><div className="divider"></div></li>
                <li><div className="waves-effect sidenav-close" onClick={handleSignOut}><i className="material-icons">logout</i> Sign Out</div></li>
            </ul>
        </div>
    );
};

export default withRouter(Sidenav);