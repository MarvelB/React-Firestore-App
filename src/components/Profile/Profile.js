import React from "react";
import Main from "../Main/Main";
import { connect } from "react-redux";

const Profile = ({profile, auth}) => {
    return(
        <Main>
            <div className="container content white">
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={profile.picture} width="300" />
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{profile.firstName + " " + profile.lastName}<i className="material-icons right">more_vert</i></span>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{profile.firstName + " " + profile.lastName}<i className="material-icons right">close</i></span>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet quo laboriosam nemo. Vero, debitis veniam. Non voluptatibus doloribus veritatis eos et autem praesentium, aperiam quam, vel suscipit cumque. Quasi, inventore.</p>
                    </div>
                </div>
            </div>
        </Main>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(Profile);