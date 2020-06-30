
export const createAppointment = (appointment) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        //Async call
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        appointment.day = appointment.day.toString();

        firestore.collection('appointments').add({
            ...appointment,
            custFName: profile.firstName,
            custLName: profile.lastName,
            custId: authorId,
            createdAt: new Date()
        }).then( () => {
            dispatch({ type: 'CREATE_APPOINTMENT', appointment});
        }).catch((err) => {
            dispatch({ type: 'CREATE_APPOINTMENT_ERROR', err});
        });        
    }
};