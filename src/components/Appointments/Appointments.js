import React from "react";
import Appointment from "./Appointment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Main from "../Main/Main";

const Appointments = ({appointments}) => {
    
    return(
        <Main>
            <div className="container content">
                <div className="row">
                    {appointments && appointments.map( appointment => {
                        return(
                            <Appointment appointment={appointment} key={appointment.id} />
                        )
                    })}
                </div>
            </div>
        </Main>
    )
}

const mapStateToProps = (state) => {
    
    return {
        appointments: state.firestore.ordered.appointments,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        //console.log(props) 
        return [
            { collection: 'appointments',
            where: [['custId', '==', props.auth.uid]],
            storeAs: 'appointments'
            }
        ];
    })
)(Appointments);