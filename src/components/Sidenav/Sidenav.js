import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize";

class Sidenav extends Component {
    componentDidMount() {
        var sideNav = document.querySelector("#slide-out");
        M.Sidenav.init(sideNav, {
            edge: "right"
        });
    }

    render() {
        return (
            <div>
                <ul className="sidenav" id="slide-out">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={this.props.profile.picture} width="300" />
                            </div>
                            <NavLink to="/profile" className="sidenav-close"><span className="btn btn-floating red">{this.props.profile.initials}</span></NavLink>
                            <NavLink to="/profile" className="sidenav-close"><span className="black-text bold name">{this.props.profile.firstName + " " + this.props.profile.lastName}</span></NavLink>
                        </div>
                    </li>
                    <li><NavLink to="/profile" className="waves-effect sidenav-close">Profile</NavLink></li>
                    <li><div className="divider"></div></li>
                    <li><NavLink className="waves-effect sidenav-close" to="/appointments">Appointments</NavLink></li>
                    <li><div className="divider"></div></li>
                    <li><NavLink className="waves-effect sidenav-close" to="/create-appointment">Create Appointment</NavLink></li>
                </ul>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Sidenav);