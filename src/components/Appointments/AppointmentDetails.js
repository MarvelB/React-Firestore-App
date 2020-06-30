import React from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from "redux";
import Main from "../Main/Main";

function AppointmentDetails(props) {
    const { appointment } = props;

    if(appointment){
        return(
            <Main>
                <div className="container content appointment-details">
                    <div className="card z depth-0">
                        <div className="card-content">
                            <span className="card-title">{appointment.custFName + " " + appointment.custLName}</span>
                            <p>{appointment.description}</p>
                        </div>

                        <div className="card-action gret lighten-4 text">
                            <div>Posted by {appointment.custFName}</div>
                            <div>02/03/04</div>
                        </div>
                    </div>
                </div>
            </Main>
        )
    } else {
        return (
                <Main>
                    <div className="container center">
                        <p>Loading appointment..</p>
                    </div>
                </Main>
            );
    }
    
};

    const mapStateToProps = (state, innerProps) => {
    // console.log(state);
    const id = innerProps.match.params.id;
    const appointments = state.firestore.data.appointments;
    const appointment = appointments ? appointments[id] : null;
    return {
      appointment: appointment
    }
  }
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'appointments'
    }])
  )(AppointmentDetails)
