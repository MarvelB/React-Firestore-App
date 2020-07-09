import React from "react";
import Appointment from "./Appointment";
import Main from "../Main/Mainv2";
import { withRouter } from "react-router";
import { useUser, useFirestore, useFirestoreCollection } from 'reactfire';

const Appointments = ({appointments}) => {
    const user = useUser();
    const firestore = useFirestore();

    var appointments = [];
    const appointmentsRef = useFirestoreCollection(firestore.collection('appointments').where('custId', '==', user? user.uid: '1').orderBy('createdAt', 'desc'));
    appointmentsRef.forEach(appointment => {
        appointments.push({...appointment.data(), id: appointment.id})
    })
    
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

export default withRouter(Appointments);