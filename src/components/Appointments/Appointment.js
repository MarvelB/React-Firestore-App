import React from "react";
import moment from "moment";
import HairStyle from "../HairStyles/HairStyle";
import NailStyle from "../Nails/NailStyle";

const Appointment = ({appointment}) => {
    
    return (
        <div className="col s12">
            <div className="card large z-depth-2 appointment-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{'Appointment on ' + moment(appointment.day).format('ddd D, MMMM') + ' from: ' + appointment.timeSlot.from + " to: " + appointment.timeSlot.to}</span>
                    <div className="row">
                        {appointment.hairStyle ? <HairStyle hairStyle={appointment.hairStyle} blockLink="true" /> : null}
                        {appointment.nailStyle ? <NailStyle nailStyle={appointment.nailStyle} blockLink="true" /> : null}
                    </div>
                    
                </div>
                <div className="card-action">
                    <div className="row">
                        <div className="col s6 m6">
                            <h5>Description</h5>
                            <h6>{appointment.description}</h6>
                        </div>
                        <div className="col s6 m6">
                            <div>{appointment.employee.firstName + " " + appointment.employee.lastName}</div>
                            <img className="materialboxed" src={appointment.employee.picture} width="200" height="120" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
//{moment(appointment.startTime.toDate()).calendar()}
export default Appointment;

/*<Link to={'/appointment/' + appointment.id}>
                        <span className="btn">Edit</span>
                    </Link> */