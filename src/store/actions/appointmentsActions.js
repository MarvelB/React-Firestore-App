
export const createAppointment = (appointment) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        //Async call
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        var err = {
            message: ''
        }

        if(!appointment.description)
            err.message = "Provide an appointment description";
        else if(!appointment.hairStyle)
            err.message = "Select a Hair Style";
        else if(!appointment.nailStyle)
            err.message = "Select a Nail Style";
        else if(!appointment.employee)
            err.message = "Select an Employee";
        else if(!appointment.day)
            err.message = "Select a Date for your appointment";
        else if(!appointment.timeSlot)
            err.message = "Select a Time Slot for your appointment";
        else
            err.message = "";

        if(!err.message){

            appointment.day = appointment.day.toString();

            firestore.collection('appointments').add({
                ...appointment,
                custFName: profile.firstName,
                custLName: profile.lastName,
                custId: authorId,
                createdAt: new Date()
            }).then( () => {
                dispatch({ type: 'CREATE_APPOINTMENT', success: 'able to create appointment'});
            }).catch((err) => {
                dispatch({ type: 'CREATE_APPOINTMENT_ERROR', err});
            });
        }else{
            dispatch({ type: 'CREATE_APPOINTMENT_ERROR', err});
        }      
    }
};