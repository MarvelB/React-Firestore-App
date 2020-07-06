
export const createAppointment = (appointment) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        //Async call
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        var err = null;

        for(const field in appointment) {
            if(!appointment[field] ){
                err = {...err, [field]: 'provide a valid ' + field + ' value'};
            }
        }
        
        if(!err){
            console.log('here')
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

export const restore = () => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        dispatch({ type: 'RESTORE'})
    }
}